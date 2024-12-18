import React from "react";

import "./styles/globals.css";
import "./styles/style.css";

import "./styles/start-page.css";
import "./styles/connected-systems.css";
import "./styles/tooltip.css";

import StartPageHeader from "./components/StartPageHeader/StartPageHeader.jsx";
import StartPageBody from "./components/StartPageBody/StartPageBody.jsx";

const StartPage = () => {
  return (
    <div className="start-page-desktop">
      <StartPageHeader />
      <StartPageBody />
    </div>
  );
};

export default StartPage;
