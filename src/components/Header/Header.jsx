import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../styles/mega-menu.css";
import "../../styles/accordion.css";

import logo from "../../assets/zcmc-logo-1.png";
import MegaMenuServices from "./MegaMenuServices";
import MegaMenuAbout from "./MegaMenuAbout";
import MegaMenuRates from "./MegaMenuRates";
import Accordion from "../Accordion/Accordion";
import Paragraph from "../Paragraph/Paragraph";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { ACTION_SIGN_IN } from "../../utils/config";
import useUniversalSearchHook from "../../hooks/UniversalSearchHook";
import SearchIcon from "@mui/icons-material/Search";
import "../UniversalSearch/universal-search.css";

const Header = ({ onClick }) => {
  const [isEnabled, setisEnabled] = useState(false);
  const { openModal } = useUniversalSearchHook();

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal]);

  const toggleFullScreenPanel = () => {
    setisEnabled((prev) => !prev);
  };

  useEffect(() => {
    // Add or remove the 'active' class from the body when the panel is toggled
    if (isEnabled) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }

    // Cleanup the body class on unmount
    return () => {
      document.body.classList.remove("active");
    };
  }, [isEnabled]); // Runs when isEnabled changes

  return (
    <header className="header">
      <Link to="/" className="icon" rel="noopener noreferrer">
        <img className="zcmc-logo" src={logo} alt="Logo" />
        <div className="icon-label-container">
          <div className="caption"></div>
          <hr className="header-divider" />
          <div className="title"></div>
          <p className="address"></p>
        </div>
      </Link>

      <div className="navbar navbar-sm">
        <MegaMenuServices />
        <MegaMenuAbout />
        <MegaMenuRates />
        <a
          className="header-link"
          href="#search"
          onClick={(e) => {
            e.preventDefault();
            openModal("pr");
          }}
        >
          Track Document
        </a>
        <a className="header-link" href="#">
          Transparency seal
        </a>
        <a className="header-link" href="#">
          Privacy notice
        </a>
      </div>

      {/* Mobile menu and search buttons */}
      <div className="mobile-header-actions">
        <button
          type="button"
          className="mobile-search-btn"
          onClick={() => openModal("pr")}
          aria-label="Search or track transactions"
          title="Search / Track (Ctrl+K)"
        >
          <SearchIcon style={{ fontSize: "20px", color: "#ffffff" }} />
        </button>

        <button
          className="menu-CTA"
          onClick={toggleFullScreenPanel}
          aria-label="Toggle navigation menu"
        >
          <svg
            className={`menu-CTA-icon ${isEnabled ? "icon-active" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke=""
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={`nav-panel-sm ${isEnabled ? "active" : ""}`}>
        <div className="nav-panel-content-sm navigation-sm">
          <div className="main-navigation-sm">
            <Paragraph text="Main navigation" className="nav-panel-label" />
            <div className="list-sm">
              <Accordion />
            </div>
          </div>

          <hr className="divider" />

          <div className="helpful-links-sm">
            <p className="nav-panel-label">Helpful links</p>
            <div className="list-sm">
              <a
                href="#search"
                className="nav-panel-link"
                onClick={(e) => {
                  e.preventDefault();
                  setisEnabled(false);
                  openModal("pr");
                }}
              >
                Track PR / Document
              </a>
              <Link
                to="/StartPage"
                className="nav-panel-link"
                rel="noopener noreferrer"
              >
                Transparency Seal
              </Link>
              <Link
                to="/StartPage"
                className="nav-panel-link"
                rel="noopener noreferrer"
              >
                Privacy notice
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-panel-content-sm cta-group">
          <div className="cta-group-sm">
            <div className="cta-buttons">
              <Link
                to={`/${ACTION_SIGN_IN}`}
                className="CTA"
                rel="noopener noreferrer"
              >
                Log on to One ZCMC
              </Link>
              <Link
                to="tel:09155365583"
                className="secondary-CTA"
                rel="noopener noreferrer"
              >
                Call us via Globe (09155-36-5583)
              </Link>
            </div>

            <div>
              <Paragraph
                text="Zamboanga City Medical Center - Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines, 7000"
                className="cta-group-sm-address"
              />
              <Paragraph
                text="© 2024 ZCMC. All rights reserved."
                className="cta-group-sm-copyright"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu and full screen panel - end */}

      <div className="div" id="div-sm">
        <button
          type="button"
          className="header-search-btn"
          onClick={() => openModal("pr")}
          title="Search transactions or track Purchase Requests (Ctrl+K)"
          aria-label="Search or track transactions"
        >
          <SearchIcon className="header-search-icon" />
          <span className="header-search-label">Track / Search</span>
          <kbd className="header-search-kbd">Ctrl K</kbd>
        </button>

        <Button
          className="CTA"
          rel="noopener noreferrer"
          style={{ color: "white", textTransform: "none" }}
          onClick={() => onClick()}
        >
          Log on to One ZCMC
        </Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
};

export default Header;
