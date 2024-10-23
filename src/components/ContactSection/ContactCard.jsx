import React from 'react';

const ContactCard = ({ icon, title, subtitle, details }) => {
  return (
    <article className="contact-card">
      <img src={icon} alt="" className="card-icon" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
        <dl className="card-details">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <dt className="detail-label">{detail.label}</dt>
              <dd className="detail-value">{detail.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
      <style jsx>{`
        .contact-card {
          border-radius: 12px;
          background-color: #f6f6f6;
          display: flex;
          flex-direction: column;
          padding: 24px;
          min-width: 240px;
          flex: 1;
          flex-basis: 0%;
        }
        .card-icon {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }
        .card-content {
          margin-top: 64px;
        }
        .card-title {
          color: #101618;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .card-subtitle {
          color: #333;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .contact-details {
        display: flex;
        margin-top: 20px;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        }

        .contact-item {
        margin-top: 0;
        display: flex;
        width: 100%;
        align-items: center;
        gap: 8px;
        justify-content: flex-start;
        margin-top: 8px;
        }

        .contact-label {
        color: #333;
        font-size: 14px;
        font-weight: 400;
        margin: auto 0;
        width: 125px;
        text-align: left;
        }

        .contact-value {
        color: #101618;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        }

        @media (max-width: 991px) {
          .contact-card {
            width: 100%;
          }
        }
      `}</style>
    </article>
  );
};

export default ContactCard;