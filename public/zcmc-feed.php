<?php
/**
 * ZCMC Official Website Live Feed Proxy (zcmc.doh.gov.ph)
 * Fetches carousel slides (.orbit-slide) and latest news (.post-box) HTML
 * with 10-minute server-side caching and safe fallback handling.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: text/html; charset=UTF-8");
header("Cache-Control: public, max-age=600");

$requestMethod = $_SERVER["REQUEST_METHOD"] ?? "GET";
if ($requestMethod === "OPTIONS") {
    http_response_code(200);
    exit;
}

$cacheDir = sys_get_temp_dir();
$cacheFile = rtrim($cacheDir, "/\\") . "/zcmc_doh_feed_cache.html";
$cacheTtl = 600; // 10 minutes

try {
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
        $cached = @file_get_contents($cacheFile);
        if ($cached && strlen($cached) > 1000) {
            echo $cached;
            exit;
        }
    }
} catch (Throwable $e) {
    // Ignore cache error and proceed to live fetch
}

$targetUrl = "https://zcmc.doh.gov.ph/";
$html = false;

if (function_exists("curl_init")) {
    try {
        $ch = curl_init($targetUrl);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_CONNECTTIMEOUT => 6,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            CURLOPT_HTTPHEADER => [
                "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language: en-US,en;q=0.9",
            ],
        ]);
        $html = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200 || !$html || strlen($html) < 1000) {
            $html = false;
        }
    } catch (Throwable $e) {
        $html = false;
    }
}

if (!$html && ini_get("allow_url_fopen")) {
    try {
        $context = stream_context_create([
            "http" => [
                "method" => "GET",
                "timeout" => 12,
                "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n",
            ],
            "ssl" => [
                "verify_peer" => false,
                "verify_peer_name" => false,
            ],
        ]);
        $html = @file_get_contents($targetUrl, false, $context);
    } catch (Throwable $e) {
        $html = false;
    }
}

if ($html && strlen($html) > 1000) {
    @file_put_contents($cacheFile, $html);
    echo $html;
} elseif (file_exists($cacheFile)) {
    // Serve stale cache if live site is temporarily unreachable
    echo @file_get_contents($cacheFile);
} else {
    http_response_code(502);
    echo "<!-- Feed temporarily unavailable -->";
}
