import React from 'react';

import Paragraph from "../Paragraph/Paragraph";
import ContactCard from './ContactCard';
import MapComponent from './MapComponent';
import SocialLinks from './SocialLinks';

const ContactSection = () => {
  const contactCards = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d1d0e7f50a24543f69e43dc9b73cf4480e1e91f24d65f2be8f498df51ff0d65?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b",
      title: "Call us",
      subtitle: "Anytime from Monday - Sunday.",
      details: [
        { label: "Direct line:", value: "062 9912934" },
        { label: "Via Globe call:", value: "09155365583" },
        { label: "Fax number:", value: "062 9910573" }
      ]
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2ab608ecf0f6f11274e496582adf8dcf463bef61af26c3109365ef001def77d5?placeholderIfAbsent=true&apiKey=052a318ec63b49ddbf4f2834ebe7790b",
      title: "Email us",
      subtitle: "Our team is here to help.",
      details: [
        { label: "Email address:", value: "mc-chief@zcmc.doh.gov.ph" },
        { label: "", value: "doh9_zcmc@yahoo.com" }
      ]
    }
  ];

  return (
    <section className="contact-section">
      <header className="section-header">
        <Paragraph text="We'd love to hear from you" className="section-subheading" />
        <h1 className="section-heading">Contact and visit us</h1>
        <Paragraph text="We are open anytime from Monday to Sunday including holidays." className="section-description" />
      </header>
      <div className="contact-content">
        <div className="contact-container">
          {contactCards.map((card, index) => (
            <ContactCard key={index} {...card} />
          ))}
          <MapComponent />
        </div>
        <address className="contact-address">
          Zamboanga City Medical Center - Dr. Evangelista St., Sta. Catalina, Zamboanga City, Philippines, 7000
        </address>
        <SocialLinks />
      </div>
    </section>
  );
};

export default ContactSection;