import React from "react";
import { Suspense } from "react";

import zcmc from "./assets/zcmc-logo-1.png";
import dpo from "./assets/mcc-corner/5.png";

import "./styles/globals.css";
import "./styles/style.css";

import "./styles/start-page.css";
import "./styles/connected-systems.css";
import "./styles/segmented-button-memo.css";
import "./styles/tooltip.css";

import StartPageHeader from "./components/StartPageHeader/StartPageHeader.jsx";
import StartPageBody from "./components/StartPageBody/StartPageBody.jsx";

const StartPage = () => {
  return (
    <div className="start-page-desktop">
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-logo-container">
              <img className="loader-logo zcmc" src={zcmc} alt="ZCMC Logo" />
              {/* <img className="loader-logo dpo" src={dpo} alt="DPO Logo" /> */}
            </div>
            <div className="custom-loader"></div>
          </div>
        }
      >
        <StartPageHeader />
        <StartPageBody />
      </Suspense>
    </div>
  );
};

export default StartPage;
