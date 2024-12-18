import React from "react";
import { Link } from "react-router-dom";

import cert from "../../assets/nested-pages/zcmc-cert.png";
import ema from "../../assets/nested-pages/zcmc-ema.png";
import foi from "../../assets/nested-pages/zcmc-foi.png";
import mcc from "../../assets/nested-pages/zcmc-mcc.png";
import pgs from "../../assets/nested-pages/zcmc-pgs.png";
import sm from "../../assets/nested-pages/zcmc-sm.png";

import "../../styles/nested-pages-images.css";

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

const NestedPagesImages = () => {
  return (
    <div className="nested-pages-images">
      <div className="nested-page-image-container">
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
    </div>
  );
};

export default NestedPagesImages;
