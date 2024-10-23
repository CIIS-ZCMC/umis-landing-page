import React from "react";
import phoneIcon from '../../assets/contact/phone-1.svg';
import emailIcon from '../../assets/contact/mail-1.svg';

import img18 from '../../assets/contact/image-18.png';
import img19 from '../../assets/contact/image-19.png';
import img21 from '../../assets/contact/image-21.png';
import img22 from '../../assets/contact/image-22.png';
import img23 from '../../assets/contact/image-23.png';

const Contact = () => {
    return (
        <div className="contact">
            <div className="arrow-down-contact"></div>

            <div className="div-2">
                <div className="div-6">
                    <p className="subheading">We’d love to hear from you</p>
                    <div className="heading-4">Contact and visit us</div>
                </div>
                <p className="contact-heading-description">
                    We are open anytime from Monday to Sunday including holidays.
                </p>
            </div>

            <div className="content-3">
                <div className="container-9">
                    <div className="card-2">
                        <div className="featured-icon">
                            <img className="img-2" src={phoneIcon} alt="Phone Icon" />
                        </div>
                        <div className="content-2">
                            <div className="div-7">
                                <div className="text-2">Call us</div>
                                <p className="supporting-text">Anytime from Monday - Sunday.</p>
                            </div>
                            <div className="div-7">
                                <div className="link-container">
                                    <div className="text-wrapper-21">Direct line:</div>
                                    <a className="tel-numbers" href="tel:0629912934">062 9912934</a>
                                </div>
                                <div className="link-container">
                                    <div className="text-wrapper-21">Via Globe call:</div>
                                    <a className="tel-numbers" href="tel:09155365583">09155365583</a>
                                </div>
                                <div className="link-container">
                                    <div className="text-wrapper-21">Fax number:</div>
                                    <a className="tel-numbers" href="tel:0629910573">062 9910573</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="maps">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10923.355957798736!2d122.08179530676348!3d6.905315170392774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325041ffa967f381%3A0xecb19e86dbe0fe31!2sZamboanga%20City%20Medical%20Center!5e1!3m2!1sen!2sph!4v1727676983541!5m2!1sen!2sph"
                            width="600" height="450" allowFullScreen loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    <div className="card-3">
                        <div className="featured-icon">
                            <img className="img-2" src={emailIcon} alt="Email Icon" />
                        </div>
                        <div className="content-2">
                            <div>
                                <p className="text-2">Email us</p>
                                <p className="supporting-text">Our team is here to help.</p>
                            </div>

                            <div>
                                <p className="text-wrapper-25">Email address:</p>
                                <div className="link-container">
                                    <a className="email" href="mailto:mc-chief@zcmc.doh.gov.ph">mc-chief@zcmc.doh.gov.ph</a>
                                </div>
                                <div className="link-container">
                                    <a className="email" href="mailto:doh9_zcmc@yahoo.com">doh9_zcmc@yahoo.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-10">
                    <hr className="light-divider" />
                    <p className="supporting-text-2">
                        Zamboanga City Medical Center - Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines, 7000
                    </p>
                </div>

                <div className="pages">
                    <div className="supporting-text-3">Official Facebook Pages:</div>
                    <div className="div">
                        <a className="fb-link" href="https://www.facebook.com/zcmcdoh9" rel="noopener noreferrer">
                            <img className="image-7" src={img18} alt="Facebook 1" />
                        </a>
                        <a className="fb-link" href="https://www.facebook.com/paccu.zcmc" rel="noopener noreferrer">
                            <img className="image-8" src={img19} alt="Facebook 2" />
                        </a>
                        <a className="fb-link" href="https://www.facebook.com/zcmcphu" rel="noopener noreferrer">
                            <img className="image-8" src={img21} alt="Facebook 3" />
                        </a>
                        <a className="fb-link" href="https://www.facebook.com/people/Zcmc-Petro/pfbid0wXwNGYGNJZHhjyuL4wLGZMC77d3985PXXdFEfVSPSqF3e14RX9XjsjEknkFpkX33l/" rel="noopener noreferrer">
                            <img className="image-9" src={img22} alt="Facebook 4" />
                        </a>
                        <a className="fb-link" href="https://www.facebook.com/zcmcSafEU" rel="noopener noreferrer">
                            <img className="image-8" src={img23} alt="Facebook 5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
