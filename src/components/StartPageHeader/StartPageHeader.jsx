import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../../assets/avatar-icon.png";
import logo from "../../assets/zcmc-logo-1.png";

import Paragraph from "../Paragraph/Paragraph";
import useUserHook from "../../hooks/UserHook";
import { Button } from "@mui/material";

const StartPageHeader = () => {
  const navigate = useNavigate();
  const { signOut } = useUserHook();

  function handleSignout() {
    signOut((status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        return console.log(feedback);
      }

      return navigate("/login");
    });
  }

  return (
    <header className="start-page-header">
      <Link to="/" className="icon" rel="noopener noreferrer">
        <img className="zcmc-logo" src={logo} alt="Logo" />
        <div className="icon-label-container">
          <div className="caption"></div>
          <hr className="header-divider" />
          <div className="title"></div>
          <Paragraph text="" className="address" />
        </div>
      </Link>

      <div className="navbar navbar-sm">
        <Link to="/" className="header-link" rel="noopener noreferrer">
          Transparency seal
        </Link>
        <Link to="/" className="header-link" rel="noopener noreferrer">
          Privacy notice
        </Link>
      </div>

      <div className="div account-used-container-sm">
        <div className="account-used account-used-sm">
          <div className="user-avatar user-avatar-sm">
            <img className="avatar avatar-sm" src={avatar} alt="" />
            <span className="active-badge"></span>
          </div>

          <div className="user user-sm">
            <Paragraph
              text="Rodel Delos Santos MD"
              className="account-name account-name-sm"
            />
            <small className="job-position job-position-sm">
              Medical Officer II
            </small>
          </div>
          <Button
            className=""
            rel="noopener noreferrer"
            onClick={handleSignout}
          >
            <svg
              className="logout-sm"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                fill="white"
              />
            </svg>
          </Button>
        </div>

        <Button
          className="secondary-CTA account-used-CTA-sm"
          rel="noopener noreferrer"
          onClick={handleSignout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default StartPageHeader;
