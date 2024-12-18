import React from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";

import cert from "../../assets/nested-pages/zcmc-cert.png";
import ema from "../../assets/nested-pages/zcmc-ema.png";
import foi from "../../assets/nested-pages/zcmc-foi.png";
import mcc from "../../assets/nested-pages/zcmc-mcc.png";
import pgs from "../../assets/nested-pages/zcmc-pgs.png";
import sm from "../../assets/nested-pages/zcmc-sm.png";

const Images = [
  {
    link: "",
    alt: "August 10, 2023",
    className: "image image-1",
    image: foi,
  },

  {
    link: "",
    alt: "August 12, 2023",
    className: "image image-2",
    image: mcc,
  },

  {
    link: "",
    alt: "August 15, 2023",
    className: "image image-3",
    image: sm,
  },

  {
    link: "",
    alt: "August 20, 2023",
    className: "image image-4",
    image: pgs,
  },

  {
    link: "",
    alt: "August 22, 2023",
    className: "image image-5",
    image: ema,
  },

  {
    link: "",
    alt: "August 24, 2023",
    className: "image image-6",
    image: cert,
  },
];

import "../../styles/nested-pages-body.css";
import "../../styles/nested-pages-images.css";

const NestedPagesBody = () => {
  return (
    <div className="nested-pages-body">
      <div className="nested-pages-images images-1">
        <div className="nested-page-image-container">
          {Images.slice(0, 3).map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="image-wrapper"
              rel="noopener noreferrer"
            >
              <img className={item.className} src={item.image} alt={item.alt} />
            </Link>
          ))}
        </div>
      </div>

      <div className="nested-pages-container">
        <Paragraph
          text="Internal Medicine VISION, MISSION AND CORE VALUES and Services "
          className="nested-pages-heading"
        />
        <Paragraph
          text="The vision of the IM department is to be a socially accountable institution dedicated to the advancement of the Filipino adult health in the Zamboanga Peninsula, Basilan, Sulu and Tawi-Tawi (ZamBaSulTa).

Its Mission is to deliver holistic health care services to the adult Filipino communities in ZamBaSulTa through a competency-based, locally responsive and research-intensive training for general internists.

Internal Medicine Services Offered
Gastroenterology
Cardiology
Nephrology
Neurology
Endocrine
Pulmonology
Rheumatology

SPECIAL UNITS
Medical ICCU
Infectious Diseases"
          className="nested-pages-content"
        />
      </div>

      <div className="nested-pages-images images-2">
        <div className="nested-page-image-container nested-page-image-container-sm">
          {Images.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="image-wrapper"
              rel="noopener noreferrer"
            >
              <img className={item.className} src={item.image} alt={item.alt} />
            </Link>
          ))}
        </div>

        <div className="nested-page-image-container nested-page-image-container-lg">
          {Images.slice(3, 6).map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="image-wrapper"
              rel="noopener noreferrer"
            >
              <img className={item.className} src={item.image} alt={item.alt} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NestedPagesBody;
