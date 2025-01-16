import React from 'react';
import { Link } from 'react-router-dom';

import Paragraph from "../Paragraph/Paragraph";

const ContactUs = () => {

  return (
    <div className='contact-us contact-us-sm'>
      <Paragraph text="Contact us:" className="contact-caption contact-caption-sm" />
      <div className='contact-us-body contact-us-body-sm'>
        <div className='contact-us-heading contact-us-heading-sm'>
          <h4 className='contact-us-title contact-us-title-sm'>
            Innovations and Information Systems Unit
          </h4>
          <Paragraph text="Office of the Medical Center Chief" className="contact-us-description contact-us-description-sm" />
        </div>

        <hr className="start-page-divider start-page-divider-sm" />

        <div className='contact-us-details contact-us-details-sm'>
          <span className='contact-us-details-container contact-us-details-container-sm'>
            <Paragraph text="Email:" className="contact-us-label contact-us-label-sm" />
            <Link to="mailto:innovations@zcmc.doh.gov.ph" className='email contact-us-content contact-us-content-sm' rel="noopener noreferrer" >
              innovations@zcmc.doh.gov.ph
            </Link>
          </span>
          <span className='contact-us-details-container contact-us-details-container-sm'>
            <Paragraph text="Telephone:" className="contact-us-label contact-us-label-sm" />
            <Paragraph text="ext 276 or 262" className="contact-us-content contact-us-content-sm" />
          </span>
        </div>

        <hr className="start-page-divider start-page-divider-md" />
        
        <div className='contact-us-report contact-us-report-sm'>
          <Paragraph text="Report an issue on:" className="contact-us-report-label contact-us-report-label-sm" />
          <Link to="https://forms.google/report-an-issue/" className='contact-us-link contact-us-link-sm' rel="noopener noreferrer" >
            https://forms.google/report-an-issue/
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
