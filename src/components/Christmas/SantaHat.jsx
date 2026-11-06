import PropTypes from "prop-types";
import "./christmas.css";

const SantaHat = ({ className = "santa-hat-icon-overlay" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Red Hat Cone */}
      <path
        d="M 12 36 C 14 18, 32 10, 38 14 C 44 18, 45 25, 48 26 C 49 28, 50 32, 47 34 C 42 31, 40 26, 36 26 C 28 26, 18 30, 12 36 Z"
        fill="#dc2626"
      />
      {/* White Fluffy Brim */}
      <rect x="8" y="32" width="34" height="8" rx="4" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))" />
      {/* Pom-pom */}
      <circle cx="48" cy="33" r="5" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
    </svg>
  );
};

SantaHat.propTypes = {
  className: PropTypes.string,
};

export default SantaHat;
