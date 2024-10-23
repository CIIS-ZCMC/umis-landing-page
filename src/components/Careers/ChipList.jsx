import React from 'react';
import Chip from './Chip';

const ChipList = () => {
  const chips = [
    { label: 'Medical', color: '#a92626', backgroundColor: '#faeaea' },
    { label: 'Administrative', color: '#0f5721', backgroundColor: '#eff6ef' },
    { label: 'Technical', color: '#666666', backgroundColor: '#f2f2f2' },
  ];

  return (
    <div className="careers-chip-list">
      {chips.map((chip, index) => (
        <Chip key={index} {...chip} />
      ))}
      <style jsx>{`
        .careers-chip-list {
          display: flex;
          margin-top: 20px;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          letter-spacing: 0.36px;
          justify-content: flex-start;
          font: 12px Roboto, sans-serif;
        }
        @media (max-width: 991px) {
          .careers-chip-list {
            white-space: initial;
          }
        }
      `}</style>
    </div>
  );
};

export default ChipList;