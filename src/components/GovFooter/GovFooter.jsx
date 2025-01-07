import React from "react";
import { Link } from "react-router-dom";

import phLogo from "../../assets/ph-icon.png";

import Paragraph from "../Paragraph/Paragraph";

import '../../styles/gov-footer.css';

const govphlinkItems = [
  { class: "gov-footer-link", link: "http://www.gov.ph/", label: "GOV.PH" },
  {
    class: "gov-footer-link",
    link: "https://www.gov.ph/data",
    label: "Open Data Portal",
  },
  {
    class: "gov-footer-link",
    link: "https://www.officialgazette.gov.ph/",
    label: "Official Gazette",
  },
];

const govlinkItems = [
  {
    class: "gov-footer-link link-wrap",
    link: "https://president.gov.ph/",
    label: "Office of the President",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "http://ovp.gov.ph/",
    label: "Office of the Vice President",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "http://www.senate.gov.ph/",
    label: "Senate of the Philippines",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "https://www.congress.gov.ph/",
    label: "House of Representatives",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "http://sc.judiciary.gov.ph/",
    label: "Supreme Court",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "https://ca.judiciary.gov.ph/",
    label: "Court of Appeals",
  },
  {
    class: "gov-footer-link link-wrap",
    link: "http://sb.judiciary.gov.ph/",
    label: "Sandiganbayan",
  },
];

const GovFooter = () => {
  return (
    <div className="gov">
      <img className="ph-icon" src={phLogo} alt="Philippine Icon" />
      <div className="gov-container">
        <div className="gov-heading">
          <Paragraph
            text="Republic of the Philippines"
            className="gov-heading-small"
          />
          <Paragraph
            text="All content is in the public domain unless otherwise stated."
            className="gov-description-small"
          />
        </div>
        <div className="gov-ph">
          <div className="gov-ph-container-1">
            <div className="gov-list-group">
              <Paragraph text="About GOVPH" className="gov-heading-small" />
              <Paragraph
                text="Learn more about the Philippine government, its structure, how government works, and the people behind it."
                className="gov-description-small"
              />
            </div>
            <div className="gov-list-group">
              {govphlinkItems.map((item, index) => (
                <Link
                  to={item.link}
                  className={item.class}
                  key={index}
                  rel="noopener noreferrer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="gov-ph-container-2">
            <Paragraph text="Government links" className="gov-heading-small" />
            <div className="gov-list-group">
              <div className="gov-list-group">
                {govlinkItems.map((item, index) => (
                  <Link
                    to={item.link}
                    className={item.class}
                    key={index}
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovFooter;
