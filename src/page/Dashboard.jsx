import React from "react";

import "../styles/globals.css";
import "../styles/style.css";
import StartPageHeader from "../components/StartPageHeader/StartPageHeader.jsx";
import StartPageBody from "../components/StartPageBody/StartPageBody.jsx";

const Dashboard = () => {
  return (
    <div className="start-page-desktop">
      <StartPageHeader />
      <StartPageBody />
    </div>
  );
};

export default Dashboard;
