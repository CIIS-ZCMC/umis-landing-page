import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/zcmc-logo-1.png';

import Paragraph from "../Paragraph/Paragraph";

const StartPageFooterSm = () => {

  return (
    <div className='start-page-footer start-page-footer-sm'>
      <div className='start-page-footer-links'>
        <Paragraph text="Helpful links" className="start-page-footer-links-label" />

        <ul className='start-page-links-list'>
          <Link to="/" className="link" rel="noopener noreferrer" >
            Privacy notice
          </Link>
          <Link to="/" className="link" rel="noopener noreferrer" >
            Transparency seal
          </Link>
        </ul>
      </div>

      <hr className='start-page-divider' />

      <div className='start-page-footer-copyright'>
        <div className='start-page-footer-agency'>
          <img className='agency-icon' src={logo} alt="" />
          <Paragraph text="Zamboanga City Medical Center" className="start-page-agency" />
        </div>
        <small className='agency-copyright'>
          © 2024 ZCMC. All rights reserved.
        </small>
      </div>
    </div>
  );
};

export default StartPageFooterSm;
