import React from "react";
import { Suspense } from "react";

import zcmc from "./assets/zcmc-logo-1.png";
import dpo from "./assets/mcc-corner/5.png";

import Header from "./components/Header/Header.jsx";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.jsx";
import HeaderHeroContent from "./components/HeaderHeroContent/HeaderHeroContent.jsx";
import NestedPagesBody from "./components/NestedPagesBody/NestedPagesBody.jsx";

const Agency = React.lazy(() => import("./components/Agency/Agency.jsx"));
const Contact = React.lazy(() => import("./components/Contact/Contact.jsx"));
const GovComponent = React.lazy(() =>
  import("./components/GovComponent/GovComponent.jsx")
);

import "./styles/nested-pages.css";

const IMS = () => {
  return (
    <div className="landing-page-desktop nested-pages">
      <Header />
      <HeaderHeroContent />
      <Breadcrumb />
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
        <NestedPagesBody />
        <Contact />
        <Agency />
        <GovComponent />
      </Suspense>
    </div>
  );
};

export default IMS;
