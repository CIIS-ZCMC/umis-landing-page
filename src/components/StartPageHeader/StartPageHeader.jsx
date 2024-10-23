import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar-icon.png";
import logo from "../../assets/zcmc-logo-1.png";
import useUserHook from "../../hooks/UserHook";

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
        <img className="zcmc-logo" src={logo} alt="ZCMC Logo" />
        <div className="icon-label-container">
          <div className="caption">Republic of the Philippines</div>
          <hr className="header-divider" />
          <div className="title">Zamboanga City Medical Center</div>
          <p className="address">
            Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines 7000
          </p>
        </div>
      </Link>

      <div className="navbar">
        <a className="header-link" href="#">
          Transparency seal
        </a>
        <a className="header-link" href="#">
          Privacy notice
        </a>
      </div>

      <div class="div">
        <div class="account-used">
          <div class="user-avatar">
            <img className="avatar" src={avatar} alt="" />
            <span class="active-badge"></span>
          </div>

          <div class="user">
            <p class="account-name">Rodel Delos Santos, MD</p>
            <small class="job-position">Medical Officer II</small>
          </div>
        </div>

        <Link
          onClick={handleSignout}
          class="secondary-CTA"
          rel="noopener noreferrer"
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default StartPageHeader;
