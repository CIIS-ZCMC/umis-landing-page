import React, { useState } from "react";

const IconWithTooltip = ({ cardIcon, tooltipText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={cardIcon} alt="Icon" className="icon" />
      {isHovered && <span className="tooltip-text">{tooltipText}</span>}
    </div>
  );
};

export default IconWithTooltip;
