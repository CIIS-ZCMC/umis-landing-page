import React from 'react';

const Chip = ({ label, color, backgroundColor }) => {
  return (
    <div className="careers-chip">
      <div className="careers-chip-base">
        <div className="careers-container">{label}</div>
      </div>
      <style jsx>{`
        .careers-chip {
          align-self: stretch;
          display: flex;
          align-items: flex-start;
          color: ${color};
          justify-content: flex-start;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .careers-chip {
            white-space: initial;
          }
        }
        .careers-chip-base {
          border-radius: 16px;
          background-color: ${backgroundColor};
          display: flex;
          min-height: 22px;
          align-items: center;
          gap: 4px;
          justify-content: center;
          padding: 4px 8px;
        }
        @media (max-width: 991px) {
          .careers-chip-base {
            white-space: initial;
          }
        }
        .careers-container {
          align-self: stretch;
          gap: 4px;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .careers-container {
            white-space: initial;
          }
        }
      `}</style>
    </div>
  );
};

export default Chip;