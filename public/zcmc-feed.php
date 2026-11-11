<?php
/**
 * ZCMC Official Website Live Feed Proxy (zcmc.doh.gov.ph)
 * Fetches carousel slides (.orbit-slide) and latest news (.post-box) HTML
 * with 10-minute server-side caching and safe fallback handling.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$requestMethod = $_SERVER["REQUEST_METHOD"] ?? "GET";
if ($requestMethod === "OPTIONS") {
    http_response_code(200);
    exit;
}

$cacheDir = sys_get_temp_dir();
$cacheFile = rtrim($cacheDir, "/\\") . "/zcmc_doh_feed_cache.html";
$cacheTtl = 600; // 10 minutes

$isDebug = isset($_GET["debug"]);

// Serve cached file if valid and not in debug mode
if (!$isDebug && file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    $cached = @file_get_contents($cacheFile);
    if ($cached && strlen($cached) > 1000) {
        header("Content-Type: text/html; charset=UTF-8");
        header("Cache-Control: public, max-age=600");
        echo $cached;
        exit;
    }
}

$targetUrl = "https://zcmc.doh.gov.ph/";
$html = false;
$debugInfo = [];

if (function_exists("curl_init")) {
    try {
        $ch = curl_init($targetUrl);
        $curlOptions = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 14,
            CURLOPT_CONNECTTIMEOUT => 7,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_ENCODING => "", // Automatically handle gzip/deflate
            CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            CURLOPT_HTTPHEADER => [
                "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language: en-US,en;q=0.9",
                "Cache-Control: no-cache",
                "Pragma: no-cache",
            ],
        ];

        // Force IPv4 to avoid broken IPv6 routes on shared hosting
        if (defined("CURL_IPRESOLVE_V4")) {
            $curlOptions[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
        }

        // Only set followlocation if open_basedir allows it
        if (!ini_get("open_basedir")) {
            $curlOptions[CURLOPT_FOLLOWLOCATION] = true;
            $curlOptions[CURLOPT_MAXREDIRS] = 5;
        }

        curl_setopt_array($ch, $curlOptions);
        $html = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr = curl_error($ch);
        $curlErrNo = curl_errno($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);

        $debugInfo["curl"] = [
            "httpCode" => $httpCode,
            "errNo" => $curlErrNo,
            "error" => $curlErr,
            "length" => $html ? strlen($html) : 0,
            "primaryIp" => $info["primary_ip"] ?? null,
            "totalTime" => $info["total_time"] ?? null,
        ];

        if ($httpCode !== 200 || !$html || strlen($html) < 1000) {
            $html = false;
        }
    } catch (Throwable $e) {
        $html = false;
        $debugInfo["curl_exception"] = $e->getMessage();
    }
}

// Fallback 1: file_get_contents with stream context
if (!$html && ini_get("allow_url_fopen")) {
    try {
        $context = stream_context_create([
            "http" => [
                "method" => "GET",
                "timeout" => 12,
                "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\nAccept-Language: en-US,en;q=0.9\r\n",
            ],
            "ssl" => [
                "verify_peer" => false,
                "verify_peer_name" => false,
            ],
        ]);
        $html = @file_get_contents($targetUrl, false, $context);
        $debugInfo["file_get_contents"] = [
            "length" => $html ? strlen($html) : 0,
        ];
    } catch (Throwable $e) {
        $html = false;
        $debugInfo["stream_exception"] = $e->getMessage();
    }
}

// Return debug diagnostic if requested
if ($isDebug) {
    header("Content-Type: application/json; charset=UTF-8");
    header("Cache-Control: no-cache, no-store, must-revalidate");
    echo json_encode([
        "success" => (bool)$html,
        "htmlLength" => $html ? strlen($html) : 0,
        "diagnostics" => $debugInfo,
        "phpVersion" => PHP_VERSION,
        "openBasedir" => ini_get("open_basedir"),
    ], JSON_PRETTY_PRINT);
    exit;
}

if ($html && strlen($html) > 1000) {
    @file_put_contents($cacheFile, $html);
    header("Content-Type: text/html; charset=UTF-8");
    header("Cache-Control: public, max-age=600");
    echo $html;
} elseif (file_exists($cacheFile) && ($stale = @file_get_contents($cacheFile)) && strlen($stale) > 1000) {
    header("Content-Type: text/html; charset=UTF-8");
    header("Cache-Control: public, max-age=120");
    echo $stale;
} else {
    http_response_code(502);
    header("Content-Type: text/plain; charset=UTF-8");
    header("Cache-Control: no-cache, no-store, must-revalidate");
    echo "<!-- Feed temporarily unavailable -->";
}
