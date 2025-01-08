import React from 'react';

const Button = ({ label, iconSrc }) => {
  return (
    <button className="careers-button">
      <span className="careers-label">{label}</span>
      <img src={iconSrc} alt="" className="icon" />
    </button>
  );
};

export default Button;