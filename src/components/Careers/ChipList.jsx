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
    </div>
  );
};

export default ChipList;