import React, { useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";

const AccordionLinks1 = [
  {
    name: "Laboratory",
    link: "Sample link",
  },

  {
    name: "Blood bank",
    link: "Sample link",
  },

  {
    name: "Radiology",
    link: "Sample link",
  },

  {
    name: "Dental",
    link: "Sample link",
  },

  {
    name: "Dialysis",
    link: "Sample link",
  },

  {
    name: "Physical therapy",
    link: "Sample link",
  },
];

const AccordionLinks2 = [
  {
    name: "Rooms and beds",
    link: "Sample link",
  },

  {
    name: "OPD services",
    link: "Sample link",
  },

  {
    name: "Procedures",
    link: "Sample link",
  },

  {
    name: "Other fees",
    link: "Sample link",
  },
];

const MegaMenuRates = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="header-link-3 mega-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu-title">
        Rates and fees
        <svg
          className="header-link-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "#FFFFFF" }}
        >
          <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" />
        </svg>
      </div>
      {isOpen && (
        <div className="mega-menu-container-3">
          <div className="mega-menu-heading">
            <Paragraph text="Rates and fees" className="mega-menu-title" />
            <Paragraph
              text="See all fees included on certain services."
              className="mega-menu-description"
            />
          </div>
          <div className="mega-menu-content">
            <div className="mega-menu-left">
              <Paragraph text="Ancillary fees" className="mega-menu-label" />
              <hr id="mega-menu-divider" />
              <div className="mega-menu-group-1">
                <div className="mega-menu-left-1">
                  <ul className="mega-menu-list">
                    {AccordionLinks1.map((item, index) => (
                      <li key={index} className="mega-menu-list-item">
                        <Link
                          to={item.link}
                          className="mega-menu-link"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mega-menu-right">
              <Paragraph
                text="Common rates and fees"
                className="mega-menu-label"
              />
              <hr id="mega-menu-divider" />
              <div className="mega-menu-right-1">
                <ul className="mega-menu-list">
                  {AccordionLinks2.map((item, index) => (
                    <li key={index} className="mega-menu-list-item">
                      <Link
                        to={item.link}
                        className="mega-menu-link"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenuRates;
