import React from "react";
import { Link } from 'react-router-dom';

import zcmcLogo from "../../assets/zcmc-logo-1.png";

import Paragraph from "../Paragraph/Paragraph";

const usefulLinks1 = [
  { link: "/", label: "Our story" },
  { link: "/", label: "Data privacy" },
  { link: "/", label: "Transparency seal" },
  { link: "/", label: "Doctor’s directory" },
  { link: "/", label: "Strategy map" },
];

const usefulLinks2 = [
  { link: "/", label: "Performance Governance System" },
  { link: "/", label: "Ethics review board" },
  { link: "/", label: "Client’s satisfaction survey summary report" },
  { link: "/", label: "Maternal Death Control Management System" },
  { link: "/", label: "Patient’s corner" },
];

const govlinkItems = [
  { link: "https://president.gov.ph/", label: "Department of Health" },
  { link: "http://ovp.gov.ph/", label: "Department of Health R-IX" },
  { link: "http://www.senate.gov.ph/", label: "PS-PHILGEPS" },
  { link: "https://www.congress.gov.ph/", label: "E-jobs for health" },
  { link: "http://sb.judiciary.gov.ph/", label: "Sandiganbayan" },
];

const Agency = () => {
  return (
    <div className="agency">
      <div className="icon-brand">
        <img
          className="agency-icon agency-icon-sm"
          src={zcmcLogo}
          alt="Zamboanga City Medical Center"
        />
        <div className="agency-heading">
          <Paragraph
            text="Zamboanga City Medical Center"
            className="heading-title"
          />
          <Paragraph
            text="Delivering integrated healthcare to Zamboanga Peninsula and its neighboring provinces with the best
            quality level of specialty and services."
            className="heading-description"
          />
        </div>
      </div>
      <div className="list-group-container">
        <div className="useful-links">
          <Paragraph text="Useful links" className="agency-list-label" />
          <div className="list-row">
            <ul className="agency-list-group">
              {usefulLinks1.map((item1) => (
                <li key={item1.label}> {/* Use 'label' as the unique key */}
                  <Link
                    to={item1.link}
                    className="agency-footer-link"
                    rel="noopener noreferrer"
                  >
                    {item1.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="agency-list-group">
              {usefulLinks2.map((item2) => (
                <li key={item2.label}> {/* Use 'label' as the unique key */}
                  <Link
                    to={item2.link}
                    className="agency-footer-link"
                    rel="noopener noreferrer"
                  >
                    {item2.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="external-links">
          <Paragraph text="External links" className="agency-list-label" />
          <ul className="agency-list-group">
            {govlinkItems.map((item3) => (
              <li key={item3.label}> {/* Use 'label' as the unique key */}
                <Link
                  to={item3.link}
                  className="agency-footer-link"
                  rel="noopener noreferrer"
                >
                  {item3.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Agency;
