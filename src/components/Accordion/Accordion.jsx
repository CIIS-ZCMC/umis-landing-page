import React, { useState } from "react";
import arrowUp from '../../assets/news/keyboard-arrow-up.svg';
import arrowDown from '../../assets/news/keyboard-arrow-down.svg';

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
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z" fill="" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" fill="" />
                                </svg>
                            )}
                        </span>
                    </div>
                    {expandedItem === 1 && (
                        <ul className="accordion-content">
                            {["ZCMC Profile", "Organizational chart", "Strategy map 2018", "Performance Governance System", "Transparency seal", "Data privacy statement", "Registration statement", "Job opportunities"].map((item, index) => (
                                <li key={index} className="accordion-list-item">
                                    <a className="accordion-link" href="#" rel="noopener noreferrer">{item}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="accordion-item">
                    <div className="accordion-header" onClick={() => toggleItem(2)}>
                        About us
                        <span className="accordion-icon">
                            {expandedItem === 2 ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z" fill="" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" fill="" />
                                </svg>

                            )}
                        </span>
                    </div>
                    {expandedItem === 2 && (
                        <ul className="accordion-content">
                            {["Laboratory", "Blood bank", "Radiology", "Dental", "Dialysis", "Physical therapy", "Rooms and beds", "OPD services", "Procedures", "Other fees"].map((item, index) => (
                                <li key={index} className="accordion-list-item">
                                    <a className="accordion-link" href="#" rel="noopener noreferrer">{item}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="accordion-item">
                    <div className="accordion-header" onClick={() => toggleItem(3)}>
                        Rates and fees
                        <span className="accordion-icon">
                            {expandedItem === 3 ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8803 14.7095L12.0003 10.8295L8.12027 14.7095C7.73027 15.0995 7.10027 15.0995 6.71027 14.7095C6.32027 14.3195 6.32027 13.6895 6.71027 13.2995L11.3003 8.70945C11.6903 8.31945 12.3203 8.31945 12.7103 8.70945L17.3003 13.2995C17.6903 13.6895 17.6903 14.3195 17.3003 14.7095C16.9103 15.0895 16.2703 15.0995 15.8803 14.7095Z" fill="" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z" fill="" />
                                </svg>
                            )}
                        </span>
                    </div>
                    {expandedItem === 3 && (
                        <ul className="accordion-content">
                            {["Internal Medicine", "Surgery", "Pediatrics", "Laboratory medicine", "Rehabilitation", "Out patient", "Nuclear medicine", "OB Gynecology", "Radiology", "Ophthalmology", "Psychiatry services", "Kangaroo mother care", "Water testing laboratory", "Hemodialysis", "Help emergency management staff", "Toxicology unit", "TB Dots clinic", "Multiple drug resistant (MDR) treatment center"].map((service, index) => (
                                <li key={index} className="accordion-list-item">
                                    <a className="accordion-link" href="#">{service}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
            <style jsx>{`
                .accordion-container {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }

                .accordion {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    gap: 0;
                    overflow: hidden;
                    display: flex;
                }

                .accordion-item {
                    padding: 0;
                }

                .accordion-header {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    color: white;
                    padding: 8px 0;
                    cursor: pointer;
                    color: var(--color-system-base-colors-bg-white-100-ffffff, #FFF);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%; /* 21px */
                    justify-content: space-between;
                    align-items: center;
                }

                .accordion-header:hover {
                    background: #0B4636;
                }

                .accordion-icon {
                    font-size: 20px;
                    transition: color 0.3s ease;
                }

                .icon path {
                    background: #ffffff !important;
                }

                .accordion-header:hover .accordion-icon {
                    cursor: pointer;
                }

                .accordion-content {
                    padding-left: 12px;
                    list-style: none;
                    display: block; /* Ensures the content is shown when toggled */
                    max-height: 194px;
                    overflow-y: auto;
                }

                .accordion-list-item {
                    padding: 8px 0;
                    height: 32px;
                }

                .accordion-link {
                    color: var(--color-system-base-colors-bg-white-100-ffffff, #FFF);
                    text-decoration: none;
                    color: var(--color-system-base-colors-bg-white-100-ffffff, #FFF);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%; /* 21px */
                    height: 24px
                }

                .accordion-link:hover {
                    color: #0073e6;
                }
            `}</style>
        </div>
    );
};

export default Accordion;
