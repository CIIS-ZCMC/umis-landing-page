import React from "react";
import { Suspense } from "react";

import Header from "./components/Header/Header.jsx";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.jsx";
import HeaderHeroContent from "./components/HeaderHeroContent/HeaderHeroContent.jsx";
import NestedPagesBody from "./components/NestedPagesBody/NestedPagesBody.jsx";

const Agency = React.lazy(() => import("./components/Agency/Agency.jsx"));
const Contact = React.lazy(() => import("./components/Contact/Contact.jsx"));
const GovComponent = React.lazy(() => import("./components/GovComponent/GovComponent.jsx"));

import './styles/nested-pages.css';

const IMS = () => {
  return (
    <div className="landing-page-desktop nested-pages">
      <Header />
      <HeaderHeroContent />
      
      <Breadcrumb />

      <Suspense fallback={<div>Loading...</div>}>
        <NestedPagesBody/>
        <Contact />
        <Agency />
        <GovComponent />
      </Suspense>
    </div>
  );
};

export default IMS;
