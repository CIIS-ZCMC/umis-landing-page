const CACHE_KEY = "zcmc_doh_live_feed_v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let inflightPromise = null;
let memoryCache = null;

/**
 * Normalize fancy Unicode mathematical bold/italic characters into clean standard ASCII/UTF-8 text
 */
const cleanText = (str = "") => {
  if (!str) return "";
  try {
    return str
      .normalize("NFKC")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return str.replace(/\s+/g, " ").trim();
  }
};

/**
 * Parse raw HTML from https://zcmc.doh.gov.ph/
 * Extracts:
 *  1. Carousel slides from `.orbit-container .orbit-slide`
 *  2. Latest news articles from `.post-box`
 */
export const parseZcmcDohHtml = (html) => {
  if (!html || typeof html !== "string" || html.length < 500) {
    return null;
  }

  // Ensure we didn't receive unexecuted PHP source code
  if (html.trim().startsWith("<?php")) {
    return null;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 1. Scrape Carousel Slides (.orbit-container .orbit-slide)
    const slideNodes = doc.querySelectorAll(".orbit-container .orbit-slide");
    const slides = [];
    const seenImages = new Set();

    slideNodes.forEach((li, index) => {
      const imgEl = li.querySelector("img.orbit-image, img");
      if (!imgEl) return;

      const rawSrc = imgEl.getAttribute("src") || "";
      if (!rawSrc || seenImages.has(rawSrc)) return;
      seenImages.add(rawSrc);

      // Prefer 1024px medium-large image from srcset if available for faster loading, else rawSrc
      let bestImage = rawSrc;
      const srcset = imgEl.getAttribute("srcset") || "";
      if (srcset) {
        const match1024 = srcset.match(/(https:\/\/[^\s,]+-1024x\d+\.[a-zA-Z0-9]+)\s+1024w/);
        if (match1024 && match1024[1]) {
          bestImage = match1024[1];
        }
      }

      const captionEl = li.querySelector("figcaption.orbit-caption, .orbit-caption");
      const rawCaption = captionEl ? cleanText(captionEl.textContent) : "";
      const linkEl = li.querySelector("a[href]");
      const href = linkEl ? linkEl.getAttribute("href") : "";

      slides.push({
        image: bestImage,
        fallbackOriginalImage: rawSrc,
        title: rawCaption || `ZCMC Official Highlight #${index + 1}`,
        subtitle: "Live update from Zamboanga City Medical Center (zcmc.doh.gov.ph)",
        link: href && href !== "#" ? href : "https://zcmc.doh.gov.ph/",
        isDynamic: true,
      });
    });

    // 2. Scrape Latest News (.post-box)
    const postBoxNodes = doc.querySelectorAll(".post-box");
    const newsPosts = [];

    postBoxNodes.forEach((box) => {
      const titleLinkEl = box.querySelector(".entry-title a, h2 a");
      if (!titleLinkEl) return;

      const title = cleanText(titleLinkEl.textContent);
      const link = titleLinkEl.getAttribute("href") || "https://zcmc.doh.gov.ph/";
      if (!title) return;

      // Extract image
      const imgEl = box.querySelector("img.wp-post-image, img");
      const thumbUrl = imgEl ? imgEl.getAttribute("src") || "" : "";
      // WordPress uses -150x150 suffix on thumbnails; stripping it yields the full-res featured photo
      const highResUrl = thumbUrl ? thumbUrl.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, "$1") : "";

      // Extract date
      const postedOnEl = box.querySelector(".posted-on");
      let dateText = "";
      if (postedOnEl) {
        const clone = postedOnEl.cloneNode(true);
        const sr = clone.querySelector(".screen-reader-text");
        if (sr) sr.remove();
        dateText = cleanText(clone.textContent)
          .replace(/^Posted on\s*/i, "")
          .replace(/\s+at\s+\d+:\d+\s*(am|pm)?$/i, "");
      }

      // Extract excerpt summary
      const contentP = box.querySelector(".entry-content p, .entry-content");
      let description = "";
      if (contentP) {
        const clone = contentP.cloneNode(true);
        const moreTag = clone.querySelector(".moretag, a.moretag");
        if (moreTag) moreTag.remove();
        description = cleanText(clone.textContent);
        // Strip duplicate leading uppercase title if post body repeats the title at start
        if (
          description.toLowerCase().startsWith(title.toLowerCase()) &&
          description.length > title.length + 15
        ) {
          description = description.slice(title.length).replace(/^[\s!.:—–-]+/, "");
        }
      }

      newsPosts.push({
        title,
        date: dateText || "Recent Update",
        image: thumbUrl,
        highResImage: highResUrl || thumbUrl,
        link,
        description:
          description ||
          "Read the full official announcement from Zamboanga City Medical Center.",
        isDynamic: true,
      });
    });

    if (slides.length === 0 && newsPosts.length === 0) {
      return null;
    }

    return {
      slides,
      newsPosts,
      fetchedAt: Date.now(),
    };
  } catch {
    return null;
  }
};

/**
 * Fetch helper with timeout
 */
const fetchWithTimeout = async (url, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const text = await res.text();
    return text;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Fetches and parses live carousel + `.post-box` news from https://zcmc.doh.gov.ph/
 * Returns `{ slides, newsPosts }` or `null` if unreachable (allowing safe static fallback).
 */
export const fetchZcmcDohLiveFeed = async () => {
  if (memoryCache && Date.now() - memoryCache.fetchedAt < CACHE_TTL_MS) {
    return memoryCache;
  }

  // Check localStorage cache first for instant load
  try {
    const rawCached = localStorage.getItem(CACHE_KEY);
    if (rawCached) {
      const parsedCache = JSON.parse(rawCached);
      if (
        parsedCache &&
        parsedCache.fetchedAt &&
        Date.now() - parsedCache.fetchedAt < CACHE_TTL_MS &&
        (parsedCache.slides?.length > 0 || parsedCache.newsPosts?.length > 0)
      ) {
        memoryCache = parsedCache;
        return parsedCache;
      }
    }
  } catch {
    // Ignore storage errors
  }

  if (inflightPromise) {
    return inflightPromise;
  }

  inflightPromise = (async () => {
    const endpoints = import.meta.env.DEV
      ? [
          "/api/zcmc-doh-proxy",
          "/zcmc-feed.php?v=2",
          "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://zcmc.doh.gov.ph/"),
        ]
      : [
          "/zcmc-feed.php?v=2",
          "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://zcmc.doh.gov.ph/"),
        ];

    for (const endpoint of endpoints) {
      const html = await fetchWithTimeout(endpoint, 8500);
      if (html) {
        const parsed = parseZcmcDohHtml(html);
        if (parsed && (parsed.slides.length > 0 || parsed.newsPosts.length > 0)) {
          memoryCache = parsed;
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
          } catch {
            // Ignore quota errors
          }
          inflightPromise = null;
          return parsed;
        }
      }
    }

    // If live endpoints fail, check if we have a stale localStorage cache before returning null
    try {
      const rawStale = localStorage.getItem(CACHE_KEY);
      if (rawStale) {
        const stale = JSON.parse(rawStale);
        if (stale && (stale.slides?.length > 0 || stale.newsPosts?.length > 0)) {
          memoryCache = stale;
          inflightPromise = null;
          return stale;
        }
      }
    } catch {
      // Ignore
    }

    inflightPromise = null;
    return null;
  })();

  return inflightPromise;
};
