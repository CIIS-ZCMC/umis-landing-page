import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import zcmc from "./assets/zcmc-logo-1.png";
import dpo from "./assets/mcc-corner/5.png";

import HeaderHero from "./components/HeaderHero/HeaderHero.jsx";
import Header from "./components/Header/Header.jsx";

const GovFooter = React.lazy(() =>
  import("./components/GovComponent/GovComponent.jsx")
);
const Agency = React.lazy(() => import("./components/Agency/Agency.jsx"));
const Careers = React.lazy(() => import("./components/Careers/Careers.jsx"));
const FeaturedVideos = React.lazy(() =>
  import("./components/FeaturedVideos/FeaturedVideos.jsx")
);
const MoreInfo = React.lazy(() => import("./components/MoreInfo/MoreInfo.jsx"));
const Contact = React.lazy(() => import("./components/Contact/Contact.jsx"));
const MccCorner = React.lazy(() =>
  import("./components/MccCorner/MccCorner.jsx")
);
const News = React.lazy(() => import("./components/News/News.jsx"));
const StartPage = React.lazy(() => import("./StartPage.jsx"));
const IMS = React.lazy(() => import("./IMS.jsx"));

import "./styles/globals.css";
import "./styles/style.css";
import "./styles/text.css";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/slideshow.css";
import "./styles/arrow.css";
import AnimatedRoutes from "./routes/animated_routes.jsx";

const App = () => {
  return <AnimatedRoutes />;
};

export default App;
