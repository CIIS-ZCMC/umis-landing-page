import useUniversalSearchHook, { SEARCH_CATEGORIES } from "../../hooks/UniversalSearchHook";
import SearchIcon from "@mui/icons-material/Search";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import Button from "@mui/material/Button";
import "./universal-search.css";

const UniversalSearchTrigger = () => {
  const { openModal } = useUniversalSearchHook();

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <section className="universal-search-strip">
      <div className="universal-search-strip-inner">
        {/* Strip Top Info */}
        <div className="universal-search-strip-top">
          <div className="universal-search-strip-title-group">
            <div className="universal-search-strip-icon-box">
              <DocumentScannerOutlinedIcon fontSize="small" />
            </div>
            <div>
              <h3 className="universal-search-strip-title">
                Universal Transaction & Document Search
              </h3>
              <p className="universal-search-strip-desc">
                Track live Purchase Requests, POs, and hospital transactions across One ZCMC.
              </p>
            </div>
          </div>

          {/* Quick Categories Bar */}
          <div className="universal-search-categories-summary">
            {SEARCH_CATEGORIES.map((cat) => (
              <span
                key={cat.id}
                className={`universal-category-pill ${cat.isLive ? "active" : ""}`}
                onClick={() => openModal(cat.id)}
                style={{ cursor: "pointer" }}
                title={`Search ${cat.label}`}
              >
                {cat.shortLabel} {cat.isLive ? "●" : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Trigger Search Bar */}
        <div
          className="universal-search-trigger-bar"
          onClick={() => openModal("pr")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              openModal("pr");
            }
          }}
        >
          <SearchIcon className="universal-trigger-icon" />
          <span className="universal-trigger-placeholder">
            Search by 10-digit transaction code, PR #, or PO # (e.g. 2609298544)...
          </span>

          <div className="universal-trigger-shortcuts">
            <kbd className="universal-shortcut-kbd">
              {isMac ? "⌘" : "Ctrl"} + K
            </kbd>
            <Button
              variant="contained"
              className="universal-trigger-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                openModal("pr");
              }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Reference Chips */}
        <div className="universal-strip-quick-chips">
          <span>Quick track samples:</span>
          {["2609298544", "2609296667", "2609291964"].map((code) => (
            <button
              key={code}
              type="button"
              className="universal-strip-chip"
              onClick={() => openModal("pr", code)}
            >
              #{code}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversalSearchTrigger;
