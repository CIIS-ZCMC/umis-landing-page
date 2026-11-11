import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useUniversalSearchHook from "../../hooks/UniversalSearchHook";
import { ENABLE_CHRISTMAS_THEME, HOLIDAY_CONFIG } from "../../config/holidayConfig";
import "./mobile-native-app.css";

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return window.innerWidth <= 768 || (isMobileUA && window.innerWidth <= 900);
};

const MobileAppShell = ({ onLoginClick }) => {
  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const { openModal } = useUniversalSearchHook();

  // Track viewport resize & set native app class on <html>
  useEffect(() => {
    const updateMobileState = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      if (mobile) {
        document.documentElement.classList.add("zcmc-native-mobile-mode");
      } else {
        document.documentElement.classList.remove("zcmc-native-mobile-mode");
      }
    };

    updateMobileState();
    window.addEventListener("resize", updateMobileState, { passive: true });
    return () => {
      window.removeEventListener("resize", updateMobileState);
      document.documentElement.classList.remove("zcmc-native-mobile-mode");
    };
  }, []);

  // Listen to Christmas music state for the bottom dock indicator
  useEffect(() => {
    const handleMusicState = (e) => {
      if (e.detail) {
        setMusicPlaying(Boolean(e.detail.isPlaying));
      }
    };
    window.addEventListener("zcmc-christmas-music-state", handleMusicState);
    return () => window.removeEventListener("zcmc-christmas-music-state", handleMusicState);
  }, []);

  // Enter native browser fullscreen (hides browser URL/search bar like CasinoPlus)
  const requestNativeFullscreen = useCallback(() => {
    const docEl = document.documentElement;
    try {
      if (docEl.requestFullscreen) {
        return docEl.requestFullscreen({ navigationUI: "hide" });
      } else if (docEl.webkitRequestFullscreen) {
        return Promise.resolve(docEl.webkitRequestFullscreen());
      } else if (docEl.msRequestFullscreen) {
        return Promise.resolve(docEl.msRequestFullscreen());
      }
    } catch {
      // Ignore if unsupported by browser
    }
    return Promise.reject();
  }, []);

  const toggleFullscreen = useCallback(() => {
    const doc = document;
    const isCurrentlyFull = Boolean(
      doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement
    );

    if (!isCurrentlyFull) {
      requestNativeFullscreen().catch(() => {});
    } else {
      try {
        if (doc.exitFullscreen) {
          doc.exitFullscreen().catch(() => {});
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        }
      } catch {
        // Ignore
      }
    }
  }, [requestNativeFullscreen]);

  // Automatically trigger native fullscreen on any valid user touch/tap on mobile phones
  useEffect(() => {
    if (!isMobile) return;

    let autoFullscreenSucceeded = false;

    // Attempt immediately on load (works if launched from home screen / WebView / allowed context)
    requestNativeFullscreen()
      .then(() => {
        autoFullscreenSucceeded = true;
      })
      .catch(() => {});

    const handleMobileGesture = (e) => {
      if (autoFullscreenSucceeded) return;
      const isCurrentlyFull = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement
      );
      if (isCurrentlyFull) {
        autoFullscreenSucceeded = true;
        return;
      }

      // Do not force fullscreen if tapping directly into a text input
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      requestNativeFullscreen()
        .then(() => {
          autoFullscreenSucceeded = true;
        })
        .catch(() => {
          // Browser rejected this gesture (e.g. passive scroll); keep listening for next tap
        });
    };

    const handleFullscreenChange = () => {
      const full = Boolean(
        document.fullscreenElement || document.webkitFullscreenElement
      );
      setIsFullscreen(full);
      if (full) {
        autoFullscreenSucceeded = true;
      }
    };

    window.addEventListener("touchend", handleMobileGesture, { passive: true });
    window.addEventListener("pointerup", handleMobileGesture, { passive: true });
    window.addEventListener("click", handleMobileGesture, { passive: true });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("touchend", handleMobileGesture);
      window.removeEventListener("pointerup", handleMobileGesture);
      window.removeEventListener("click", handleMobileGesture);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [isMobile, requestNativeFullscreen]);

  if (!isMobile) return null;

  const scrollToSection = (sectionId, tabName) => {
    setActiveTab(tabName);
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleMusic = () => {
    window.dispatchEvent(new CustomEvent("zcmc-toggle-christmas-music"));
  };

  return (
    <nav className="zcmc-mobile-bottom-dock" aria-label="Mobile App Navigation">
      <button
        type="button"
        className={`mobile-dock-item ${activeTab === "home" ? "active" : ""}`}
        onClick={() => scrollToSection("top", "home")}
      >
        <span className="mobile-dock-icon">🏠</span>
        <span className="mobile-dock-label">Home</span>
      </button>

      <button
        type="button"
        className={`mobile-dock-item ${activeTab === "services" ? "active" : ""}`}
        onClick={() => scrollToSection("more-info", "services")}
      >
        <span className="mobile-dock-icon">🩺</span>
        <span className="mobile-dock-label">Services</span>
      </button>

      <button
        type="button"
        className="mobile-dock-item mobile-dock-center-cta"
        onClick={() => {
          setActiveTab("login");
          if (onLoginClick) onLoginClick();
        }}
      >
        <span className="mobile-dock-center-circle">🔐</span>
        <span className="mobile-dock-label">One ZCMC</span>
      </button>

      <button
        type="button"
        className={`mobile-dock-item ${activeTab === "track" ? "active" : ""}`}
        onClick={() => {
          setActiveTab("track");
          openModal("pr");
        }}
      >
        <span className="mobile-dock-icon">📋</span>
        <span className="mobile-dock-label">Track PR</span>
      </button>

      {ENABLE_CHRISTMAS_THEME && HOLIDAY_CONFIG.christmasSoundtrack ? (
        <button
          type="button"
          className={`mobile-dock-item ${musicPlaying ? "active-music-tab" : ""}`}
          onClick={handleToggleMusic}
          aria-label="Toggle Christmas Music"
        >
          <span className="mobile-dock-icon">{musicPlaying ? "🎵" : "🔇"}</span>
          <span className="mobile-dock-label">{musicPlaying ? "Audio On" : "Muted"}</span>
        </button>
      ) : (
        <button
          type="button"
          className={`mobile-dock-item ${isFullscreen ? "active" : ""}`}
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen App Mode"
        >
          <span className="mobile-dock-icon">{isFullscreen ? "🗗" : "⛶"}</span>
          <span className="mobile-dock-label">{isFullscreen ? "Exit Full" : "Full App"}</span>
        </button>
      )}
    </nav>
  );
};

MobileAppShell.propTypes = {
  onLoginClick: PropTypes.func,
};

export default MobileAppShell;
