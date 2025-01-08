import React from 'react';

import Paragraph from "../Paragraph/Paragraph";

const ContactCard = ({ icon, title, subtitle, details }) => {
  return (
    <article className="contact-card">
      <img src={icon} alt="" className="card-icon" />
      <div className="card-content">
        <Paragraph text={title} className="card-title" />
        <Paragraph text={subtitle} className="card-subtitle" />
        <dl className="card-details">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <dt className="detail-label">{detail.label}</dt>
              <dd className="detail-value">{detail.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </article>
  );
};

export default ContactCard;