import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccordionLinks1 = [
  {
    name: "ZCMC Profile",
    link: "Sample link",
  },

  {
    name: "Organizational chart",
    link: "Sample link",
  },

  {
    name: "Strategy map 2018",
    link: "Sample link",
  },

  {
    name: "Performance Governance System",
    link: "Sample link",
  },

  {
    name: "Transparency seal",
    link: "Sample link",
  },

  {
    name: "Data privacy statement",
    link: "Sample link",
  },

  {
    name: "Registration statement",
    link: "Sample link",
  },

  {
    name: "Job opportunities",
    link: "Sample link",
  },
];

const AccordionLinks2 = [
  {
    name: "Laboratory",
    link: "Sample link",
  },

  {
    name: "Blood bank",
    link: "Sample link",
  },

  {
    name: "Radiology",
    link: "Sample link",
  },

  {
    name: "Dental",
    link: "Sample link",
  },

  {
    name: "Dialysis",
    link: "Sample link",
  },

  {
    name: "Physical therapy",
    link: "Sample link",
  },

  {
    name: "Rooms and beds",
    link: "Sample link",
  },

  {
    name: "OPD services",
    link: "Sample link",
  },

  {
    name: "Procedures",
    link: "Sample link",
  },

  {
    name: "Other fees",
    link: "Sample link",
  },
];

const AccordionLinks3 = [
  {
    name: "Internal Medicine",
    link: "/IMS",
  },

  {
    name: "Surgery",
    link: "Sample link",
  },

  {
    name: "Pediatrics",
    link: "Sample link",
  },

  {
    name: "Laboratory medicine",
    link: "Sample link",
  },

  {
    name: "Rehabilitation",
    link: "Sample link",
  },

  {
    name: "Out patient",
    link: "Sample link",
  },

  {
    name: "Nuclear medicine",
    link: "Sample link",
  },

  {
    name: "OB Gynecology",
    link: "Sample link",
  },

  {
    name: "Radiology",
    link: "Sample link",
  },

  {
    name: "Ophthalmology",
    link: "Sample link",
  },

  {
    name: "Psychiatry services",
    link: "Sample link",
  },

  {
    name: "Kangaroo mother care",
    link: "Sample link",
  },

  {
    name: "Water testing laboratory",
    link: "Sample link",
  },

  {
    name: "Hemodialysis",
    link: "Sample link",
  },

  {
    name: "Help emergency management staff",
    link: "Sample link",
  },

  {
    name: "Toxicology unit",
    link: "Sample link",
  },

  {
    name: "TB Dots clinic",
    link: "Sample link",
  },

  {
    name: "Multiple drug resistant (MDR) treatment center",
    link: "Sample link",
  },
];

const Accordion = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-header" onClick={() => toggleItem(1)}>
            Services
            <span className="accordion-icon">
              {expandedItem === 1 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>

          {expandedItem === 1 && (
            <ul className="accordion-content">
              {AccordionLinks3.map((item, index) => (
                <div className="list-item-2" key={index}>
                  <li key={index} className="accordion-list-item">
                    <Link
                      to={item.link}
                      className="accordion-link"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>

        <div className="accordion-item">
          <div className="accordion-header" onClick={() => toggleItem(2)}>
            About us
            <span className="accordion-icon">
              {expandedItem === 2 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
          {expandedItem === 2 && (
            <ul className="accordion-content">
              {AccordionLinks1.map((item, index) => (
                <div className="list-item-2" key={index}>
                  <li key={index} className="accordion-list-item">
                    <Link
                      to={item.link}
                      className="accordion-link"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>

        <div className="accordion-item">
          <div className="accordion-header" onClick={() => toggleItem(3)}>
            Rates and fees
            <span className="accordion-icon">
              {expandedItem === 3 ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z"
                    fill=""
                  />
                </svg>
              )}
            </span>
          </div>
          {expandedItem === 3 && (
            <ul className="accordion-content">
              {AccordionLinks2.map((item, index) => (
                <div className="list-item-2" key={index}>
                  <li key={index} className="accordion-list-item">
                    <Link
                      to={item.link}
                      className="accordion-link"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
