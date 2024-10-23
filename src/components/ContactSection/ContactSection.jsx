import React from 'react';
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
        <h2 className="section-subheading">We'd love to hear from you</h2>
        <h1 className="section-heading">Contact and visit us</h1>
        <p className="section-description">
          We are open anytime from Monday to Sunday including holidays.
        </p>
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
      <style jsx>{`
        .contact-section {
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 96px 245px;
          font-family: Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .contact-section {
            padding: 40px 20px;
          }
        }
        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-subheading {
          color: #0f5721;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .section-heading {
          color: #101828;
          font-size: 36px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.72px;
          margin-bottom: 12px;
        }
        .section-description {
          color: #4d4d4d;
          font-size: 18px;
          line-height: 2;
        }
        .contact-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .contact-container {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px 64px;
          margin-bottom: 32px;
        }
        .contact-address {
          color: #333;
          font-size: 20px;
          font-weight: 400;
          text-align: center;
          margin-bottom: 32px;
          font-style: normal;
        }
        @media (max-width: 991px) {
          .contact-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;