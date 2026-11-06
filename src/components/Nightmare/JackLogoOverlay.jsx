import PropTypes from "prop-types";
import "./nightmare.css";

const JackLogoOverlay = ({ className = "jack-logo-hat-overlay" }) => {
  return (
    <>
      {/* Sandy Claws Red Hat perched on ZCMC logo */}
      <svg
        className={className}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Curved Santa Hat Body */}
        <path
          d="M 12 30 C 10 14, 28 6, 38 10 C 44 13, 46 18, 48 23 C 50 25, 50 29, 46 31 C 41 28, 38 23, 34 22 C 26 21, 16 25, 12 30 Z"
          fill="#dc2626"
        />
        {/* Fur Trim */}
        <rect
          x="10"
          y="26"
          width="30"
          height="7.5"
          rx="3.75"
          fill="#ffffff"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
        />
        {/* Pom-pom */}
        <circle cx="47" cy="30" r="4" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))" />
      </svg>
    </>
  );
};

JackLogoOverlay.propTypes = {
  className: PropTypes.string,
};

export default JackLogoOverlay;
