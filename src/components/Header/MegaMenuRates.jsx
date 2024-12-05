import React, { useState } from 'react';

const MegaMenuRates = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="header-link-3 mega-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="menu-title">
                Rates and fees
                <svg className="header-link-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#FFFFFF' }}>
                    <path
                        d="M8.11973 9.29055L11.9997 13.1705L15.8797 9.29055C16.2697 8.90055 16.8997 8.90055 17.2897 9.29055C17.6797 9.68055 17.6797 10.3105 17.2897 10.7005L12.6997 15.2905C12.3097 15.6805 11.6797 15.6805 11.2897 15.2905L6.69973 10.7005C6.30973 10.3105 6.30973 9.68055 6.69973 9.29055C7.08973 8.91055 7.72973 8.90055 8.11973 9.29055Z"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="mega-menu-container-3">
                    <div className="mega-menu-heading">
                        <p className="mega-menu-title">Rates and fees</p>
                        <p className="mega-menu-description">See all fees included on certain services.</p>
                    </div>
                    <div className="mega-menu-content">
                        <div className="mega-menu-left">
                            <p className="mega-menu-label">Ancillary fees</p>
                            <hr id="mega-menu-divider" />
                            <div className="mega-menu-group-1">
                                <div className="mega-menu-left-1">
                                    <ul className="mega-menu-list">
                                        {["Laboratory", "Blood bank", "Radiology", "Dental", "Dialysis", "Physical therapy"].map((item, index) => (
                                            <li key={index} className="mega-menu-list-item">
                                                <a className="mega-menu-link" href="#" rel="noopener noreferrer">{item}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mega-menu-right">
                            <p className="mega-menu-label">Common rates and fees</p>
                            <hr id="mega-menu-divider" />
                            <div className="mega-menu-right-1">
                                <ul className="mega-menu-list">
                                    {["Rooms and beds", "OPD services", "Procedures", "Other fees"].map((item, index) => (
                                        <li key={index} className="mega-menu-list-item">
                                            <a className="mega-menu-link" href="#" rel="noopener noreferrer">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MegaMenuRates;
