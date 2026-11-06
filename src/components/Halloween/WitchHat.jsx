import PropTypes from "prop-types";
import "./halloween.css";

const WitchHat = ({ className = "witch-hat-icon-overlay" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pointed Hat Cone */}
      <path
        d="M 25 6 C 26 14, 34 26, 38 34 L 12 34 C 16 26, 24 14, 25 6 Z"
        fill="#1e1b4b"
      />
      {/* Hat Shadow Accent */}
      <path
        d="M 25 6 C 26 14, 30 24, 32 34 L 12 34 C 16 26, 24 14, 25 6 Z"
        fill="#0f172a"
        opacity="0.4"
      />
      {/* Purple Hat Ribbon */}
      <rect x="14" y="30" width="22" height="5" rx="1.5" fill="#9333ea" />
      {/* Gold Buckle */}
      <rect x="22" y="29" width="6" height="7" rx="1" fill="#facc15" />
      <rect x="23.5" y="30.5" width="3" height="4" rx="0.5" fill="#1e1b4b" />
      {/* Curled Hat Brim */}
      <ellipse cx="25" cy="35" rx="20" ry="4" fill="#0f172a" />
      <ellipse cx="25" cy="34" rx="18" ry="3.5" fill="#1e1b4b" />
    </svg>
  );
};

WitchHat.propTypes = {
  className: PropTypes.string,
};

export default WitchHat;
