import React from 'react';

const Button = ({ label, iconSrc }) => {
  return (
    <button className="careers-button">
      <span className="careers-label">{label}</span>
      <img src={iconSrc} alt="" className="icon" />
      <style jsx>{`
        .careers-button {
          border-radius: 8px;
          background-color: #0f5721;
          display: flex;
          margin-top: 20px;
          align-items: center;
          gap: 4px;
          font-size: 16px;
          color: #f9fafb;
          line-height: 1;
          justify-content: center;
          padding: 14px 16px;
          border: none;
          cursor: pointer;
        }
        .careers-label {
          align-self: stretch;
          margin: auto 0;
        }
        .careers-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 20px;
          align-self: stretch;
          margin: auto 0;
        }
      `}</style>
    </button>
  );
};

export default Button;