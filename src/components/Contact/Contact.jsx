import React from "react";
import { Link } from "react-router-dom";

import phoneIcon from "../../assets/contact/phone-1.svg";
import emailIcon from "../../assets/contact/mail-1.svg";

import img18 from "../../assets/contact/image-18.png";
import img19 from "../../assets/contact/image-19.png";
import img21 from "../../assets/contact/image-21.png";
import img22 from "../../assets/contact/image-22.png";
import img23 from "../../assets/contact/image-23.png";

import Paragraph from "../Paragraph/Paragraph";

const Contact = () => {
  return (
    <div className="contact">
      <div className="arrow-down-contact"></div>

      <div className="div-2">
        <div className="contact-heading">
          <Paragraph text="We’d love to hear from you" className="subheading" />
          <Paragraph text="Contact and visit us" className="contact-title" />
        </div>
        <Paragraph
          text="We are open anytime from Monday to Sunday including holidays."
          className="contact-heading-description"
        />
      </div>

      <div className="contact-card-container">
        <div className="contact-card-group">
          <div className="maps"></div>

          <div className="contact-email-group">
            <div className="card-2">
              <div className="featured-icon">
                <img className="img-2" src={phoneIcon} alt="Phone Icon" />
              </div>
              <div className="content">
                <div className="card-body">
                  <div className="text-2">Call us</div>
                  <Paragraph
                    text="Anytime from Monday-Sunday."
                    className="supporting-text"
                  />
                </div>
                <div className="card-body">
                  <div className="link-container">
                    <Paragraph
                      text="Direct line:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:0629912934"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      062 9912934
                    </Link>
                  </div>
                  <div className="link-container">
                    <Paragraph
                      text="Via Globe call:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:09155365583"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      09155365583
                    </Link>
                  </div>
                  <div className="link-container">
                    <Paragraph
                      text="Fax number:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:0629910573"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      062 9910573
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-3">
              <div className="featured-icon">
                <img className="img-2" src={emailIcon} alt="Email Icon" />
              </div>
              <div className="content">
                <div>
                  <Paragraph text="Email us" className="text-2" />
                  <Paragraph
                    text="Our team is here to help."
                    className="supporting-text"
                  />
                </div>

                <div>
                  <Paragraph
                    text="Email address:"
                    className="text-wrapper-25"
                  />
                  <div className="link-container">
                    <Link
                      to="mailto:mc-chief@zcmc.doh.gov.ph"
                      className="email"
                      rel="noopener noreferrer"
                    >
                      mc-chief@zcmc.doh.gov.ph
                    </Link>
                  </div>
                  <div className="link-container">
                    <Link
                      to="mailto:doh9_zcmc@yahoo.com"
                      className="email"
                      rel="noopener noreferrer"
                    >
                      doh9_zcmc@yahoo.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card-group-lg">
          <div className="contact-email-group">
            <div className="card-2">
              <div className="featured-icon">
                <img className="img-2" src={phoneIcon} alt="Phone Icon" />
              </div>
              <div className="content">
                <div className="card-body">
                  <div className="text-2">Call us</div>
                  <Paragraph
                    text="Anytime from Monday-Sunday."
                    className="supporting-text"
                  />
                </div>
                <div className="card-body">
                  <div className="link-container">
                    <Paragraph
                      text="Direct line:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:0629912934"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      062 9912934
                    </Link>
                  </div>
                  <div className="link-container">
                    <Paragraph
                      text="Via Globe call:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:09155365583"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      09155365583
                    </Link>
                  </div>
                  <div className="link-container">
                    <Paragraph
                      text="Fax number:"
                      className="contact-label-text"
                    />
                    <Link
                      to="tel:0629910573"
                      className="tel-numbers"
                      rel="noopener noreferrer"
                    >
                      062 9910573
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="maps">
              {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10923.355957798736!2d122.08179530676348!3d6.905315170392774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325041ffa967f381%3A0xecb19e86dbe0fe31!2sZamboanga%20City%20Medical%20Center!5e1!3m2!1sen!2sph!4v1727676983541!5m2!1sen!2sph"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
            </div>

            <div className="card-3">
              <div className="featured-icon">
                <img className="img-2" src={emailIcon} alt="Email Icon" />
              </div>
              <div className="content">
                <div>
                  <Paragraph text="Email us" className="text-2" />
                  <Paragraph
                    text="Our team is here to help."
                    className="supporting-text"
                  />
                </div>

                <div>
                  <Paragraph
                    text="Email address:"
                    className="text-wrapper-25"
                  />
                  <div className="link-container">
                    <Link
                      to="mailto:mc-chief@zcmc.doh.gov.ph"
                      className="email"
                      rel="noopener noreferrer"
                    >
                      mc-chief@zcmc.doh.gov.ph
                    </Link>
                  </div>
                  <div className="link-container">
                    <Link
                      to="mailto:doh9_zcmc@yahoo.com"
                      className="email"
                      rel="noopener noreferrer"
                    >
                      doh9_zcmc@yahoo.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="address-container">
          <hr className="light-divider" />
          <Paragraph
            text="Zamboanga City Medical Center - Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines, 7000"
            className="supporting-text-2"
          />
        </div>

        <div className="pages">
          <Paragraph
            text="Official Facebook Pages:"
            className="page-image-group"
          />
          <div className="div">
            <Link
              to="https://www.facebook.com/zcmcdoh9"
              className="fb-link"
              rel="noopener noreferrer"
            >
              <img className="image-7" src={img18} alt="Facebook 1" />
            </Link>

            <Link
              to="https://www.facebook.com/paccu.zcmc"
              className="fb-link"
              rel="noopener noreferrer"
            >
              <img className="image-8" src={img19} alt="Facebook 2" />
            </Link>

            <Link
              to="https://www.facebook.com/zcmcphu"
              className="fb-link"
              rel="noopener noreferrer"
            >
              <img className="image-8" src={img21} alt="Facebook 3" />
            </Link>

            <Link
              to="https://www.facebook.com/people/Zcmc-Petro/pfbid0wXwNGYGNJZHhjyuL4wLGZMC77d3985PXXdFEfVSPSqF3e14RX9XjsjEknkFpkX33l/"
              className="fb-link"
              rel="noopener noreferrer"
            >
              <img className="image-9" src={img22} alt="Facebook 4" />
            </Link>

            <Link
              to="https://www.facebook.com/zcmcSafEU"
              className="fb-link"
              rel="noopener noreferrer"
            >
              <img className="image-8" src={img23} alt="Facebook 5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
