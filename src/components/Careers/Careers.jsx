import React from 'react';
import careersImg from '../../assets/careers/lp-bg.jpg';
import openIcon from '../../assets/careers/open-4.svg';

const Careers = () => {
  return (
    <div className="careers">
      <div className="arrow-down-careers"></div>
      <img className="careers-img" src={careersImg} alt="Careers" />
      <div className="careers-container">
        <div className="container-fit">
          <div className="careers-heading">
            <p className="body-caption">Job opportunities</p>
            <p className="careers-heading-title">
              We’re looking for talented people
            </p>
            <p className="careers-heading-description">
              Explore through Zamboanga City Medical Center’s job vacancy invitation postings with complete
              information about requirements, application process and more.
            </p>
          </div>
          <ul className="chip-list">
            <li className="chip chip-danger">Medical</li>
            <li className="chip chip-success">Administrative</li>
            <li className="chip chip-neutral">Technical</li>
          </ul>
          <hr className="divider careers-divider" />
          <a className="CTA" href="" rel="noopener noreferrer">
            Go to job postings
            <img className="open-2" src={openIcon} alt="Open" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;
