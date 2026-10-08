import { useState, useEffect, useRef } from "react";
import useUniversalSearchHook from "../../hooks/UniversalSearchHook";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./universal-search.css";

const AUTO_COLLAPSE_DELAY_MS = 4000;

const PullBookmark = () => {
  const { openModal } = useUniversalSearchHook();
  const [isAutoExpanded, setIsAutoExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Display big for 4 seconds after view loads, then slide left to small peek tab
    timerRef.current = setTimeout(() => {
      setIsAutoExpanded(false);
    }, AUTO_COLLAPSE_DELAY_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsAutoExpanded(false);
  };

  const isExpanded = isAutoExpanded || isHovered;

  return (
    <aside
      className={`pull-bookmark-wrapper ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="PR Tracking Pull Bookmark"
    >
      <button
        type="button"
        className="pull-bookmark-btn"
        onClick={() => openModal("pr")}
        aria-label="Track your PR request here"
        title="Track your PR request here (Ctrl+K)"
      >
        {/* Left / Expanded Main Card Content */}
        <div className="pull-bookmark-card-body">
          {/* Top Meta: Live Status & Category */}
          <div className="pull-bookmark-meta-row">
            <span className="pull-bookmark-ribbon-tag">
              <BookmarkBorderIcon className="pull-bookmark-tag-icon" />
              <span>ZCMC PR TRACKER</span>
            </span>
            <span className="pull-bookmark-live-pill">
              <span className="pull-bookmark-live-dot"></span>
              <span>LIVE</span>
            </span>
          </div>

          {/* Big Headline */}
          <h4 className="pull-bookmark-headline">Track your PR request here</h4>

          {/* Subtitle / Shortcut Hint */}
          <p className="pull-bookmark-desc">
            Check real-time approvals, office timeline & items • <kbd className="pull-bookmark-kbd">Ctrl K</kbd>
          </p>
        </div>

        {/* Right Edge: Persistent Bookmark Peek Tab (stays visible when collapsed) */}
        <div className="pull-bookmark-handle">
          {/* Radar Pulse Ping */}
          <span className="pull-bookmark-pulse-wrap" title="PR Tracker Live">
            <span className="pull-bookmark-pulse-ring"></span>
            <span className="pull-bookmark-pulse-core"></span>
          </span>

          {/* Tracker Icon */}
          <FindInPageIcon className="pull-bookmark-handle-icon" />

          {/* Pull Chevron Indicator */}
          <ChevronRightIcon className="pull-bookmark-handle-chevron" />
        </div>
      </button>
    </aside>
  );
};

export default PullBookmark;
