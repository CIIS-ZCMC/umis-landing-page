import React from "react";
import zcmcLogo from '../../assets/zcmc-logo-1.png'

const Agency = () => {
  return (
    <div className="agency">
      <div className="icon-brand">
        <img className="agency-icon agency-icon-sm" src={zcmcLogo} alt="Zamboanga City Medical Center" />
        <div className="agency-heading">
          <div className="heading-title">
            Zamboanga City Medical Center
          </div>
          <p className="heading-description">
            Delivering integrated healthcare to Zamboanga Peninsula and its neighboring provinces with the best
            quality level of specialty and services.
          </p>
        </div>
      </div>
      <div className="list-group-container">
        <div className="useful-links">
          <p className="agency-list-label">Useful links</p>
          <div className="list-row">
            <ul className="agency-list-group">
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Our story</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Data privacy</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Transparency seal</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Doctor’s directory</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Strategy map</a></li>
            </ul>
            <ul className="agency-list-group">
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Performance Governance System</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Ethics review board</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Client’s satisfaction survey summary report</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Maternal Death Control Management System</a></li>
              <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Patient’s corner</a></li>
            </ul>
          </div>
        </div>
        <div className="external-links">
          <p className="agency-list-label">External links</p>
          <ul className="agency-list-group">
            <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Department of Health</a></li>
            <li><a className="agency-footer-link" href="" rel="noopener noreferrer">Department of Health R-IX</a></li>
            <li><a className="agency-footer-link" href="" rel="noopener noreferrer">PS-PHILGEPS</a></li>
            <li><a className="agency-footer-link" href="" rel="noopener noreferrer">E-jobs for health</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Agency;
