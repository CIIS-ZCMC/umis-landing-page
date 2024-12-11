import React from 'react';

const Chip = ({ label, color, backgroundColor }) => {
  return (
    <div className="careers-chip">
      <div className="careers-chip-base">
        <div className="careers-container">{label}</div>
      </div>
    </div>
  );
};

export default Chip;