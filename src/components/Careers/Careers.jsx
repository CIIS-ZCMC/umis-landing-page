import React from 'react';
import { Link } from 'react-router-dom';

import careersImg from '../../assets/careers/lp-bg.jpg';
import openIcon from '../../assets/careers/open-4.svg';

import Paragraph from "../Paragraph/Paragraph";

import '../../styles/careers.css';

const Careers = () => {
  return (
    <div className="careers">
      <div className="arrow-down-careers"></div>
      <img className="careers-img" src={careersImg} alt="Careers" />
      <div className="careers-container">
        <div className="container-fit">
          <div className="careers-heading">
            <Paragraph text="Job opportunities" className="body-caption" />
            <Paragraph text="We’re looking for talented people" className="careers-heading-title" />
            <Paragraph text="Explore through Zamboanga City Medical Center’s job vacancy invitation postings with complete
              information about requirements, application process and more." className="careers-heading-description" />
          </div>
          <ul className="chip-list">
            <li className="chip chip-danger">Medical</li>
            <li className="chip chip-success">Administrative</li>
            <li className="chip chip-neutral">Technical</li>
          </ul>
          <hr className="divider" id='careers-divider' />
          <Link to="/" className="CTA" rel="noopener noreferrer" >
            Go to job postings
            <img className="open-2" src={openIcon} alt="Open" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;
