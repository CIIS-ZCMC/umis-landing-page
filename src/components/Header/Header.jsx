import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/zcmc-logo-1.png';
import MegaMenuServices from './MegaMenuServices';
import MegaMenuAbout from './MegaMenuAbout';
import MegaMenuRates from './MegaMenuRates';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState({
    services: false,
    about: false,
    rates: false,
  });

  const toggleMenu = (menu) => {
    setMenuVisible((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <header className="header">
      <Link to="/" className="icon" rel="noopener noreferrer">
        <img className="zcmc-logo" src={logo} alt="ZCMC Logo" />
        <div className="icon-label-container">
          <div className="caption">Republic of the Philippines</div>
          <hr className="header-divider" />
          <div className="title">Zamboanga City Medical Center</div>
          <p className="address">Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines 7000</p>
        </div>
      </Link>

      {/* START OF NAVBAR */}
      <div className="navbar">
        <MegaMenuServices/>
        <MegaMenuAbout/>
        <MegaMenuRates/>

        <a className="header-link" href="#">Transparency seal</a>
        <a className="header-link" href="#">Privacy notice</a>
      </div>
      {/* END OF NAVBAR */}

      <div className="div">
        <form id="searchForm" action="" method="GET">
          <input id="search" className="search" placeholder="Search" type="search" maxLength="100" />
        </form>
        <div id="error-message" style={{ color: 'red' }}></div>

        <Link to="/StartPage" className="CTA" rel="noopener noreferrer">Log on to One ZCMC</Link>
      </div>
    </header>
  );
};

export default Header;
