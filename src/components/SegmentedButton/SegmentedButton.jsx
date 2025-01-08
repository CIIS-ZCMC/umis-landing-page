import React, { useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";

const SegmentedButton = ({ medicalContent, adminContent }) => {
  const [selected, setSelected] = useState("medical"); // Default selection: 'medical'

  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <div className="segmented-button-container">
      <div className="segmented-button-group">
        <button
          className={`segmented-button ${
            selected === "medical" ? "selected" : ""
          }`}
          onClick={() => handleClick("medical")}
        >
          Medical
        </button>
        <button
          className={`segmented-button ${
            selected === "administrative" ? "selected" : ""
          }`}
          onClick={() => handleClick("administrative")}
        >
          Administrative
        </button>
      </div>

      {/* Content Display */}
      <div className="segmented-button-body">
        {selected === "medical" && (
          <div className="row">
            {medicalContent.map((item, index) => (
              <Link
                to={item.link}
                className="card"
                key={index}
                rel="noopener noreferrer"
              >
                <span className="system-icon">
                  <div
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </span>
                <div className="card-content">
                  <div className="card-heading">
                    <Paragraph text={item.title} className="card-title" />

                    <div className="tooltip">
                      <svg
                        className="Icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                      <span className="tooltip-text">{item.description}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {selected === "administrative" && (
          <div className="row">
            {adminContent.map((item, index) => (
              <Link
                to={item.link}
                className="card"
                key={index}
                rel="noopener noreferrer"
              >
                <span className="system-icon">
                  <div
                    className="icon"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </span>
                <div className="card-content">
                  <div className="card-heading">
                    <Paragraph text={item.title} className="card-title" />

                    <div className="tooltip">
                      <svg
                        className="Icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                      <span className="tooltip-text">{item.description}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentedButton;
