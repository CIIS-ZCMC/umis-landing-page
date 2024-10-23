import React from "react";
import phLogo from '../../assets/ph-icon.png';

const GovComponent = () => {
    return (
        <div className="gov">
            <img className="ph-icon" src={phLogo} alt="Philippine Icon" />
            <div className="gov-container">
                <div className="gov-heading">
                    <div className="gov-heading-small">Republic of the Philippines</div>
                    <p className="gov-description-small">
                        All content is in the public domain unless otherwise stated.
                    </p>
                </div>
                <div className="gov-ph">
                    <div className="gov-list-group">
                        <div className="gov-heading-small">About GOVPH</div>
                        <p className="gov-description-small">
                            Learn more about the Philippine government, its structure, how government works, and the people behind it.
                        </p>
                    </div>
                    <div className="gov-list-group">
                        <a className="gov-footer-link" href="http://www.gov.ph/" rel="noopener noreferrer">GOV.PH</a>
                        <a className="gov-footer-link" href="https://www.gov.ph/data" rel="noopener noreferrer">Open Data Portal</a>
                        <a className="gov-footer-link" href="https://www.officialgazette.gov.ph/" rel="noopener noreferrer">Official Gazette</a>
                    </div>
                </div>
                <div className="gov-links">
                    <div className="gov-heading-small">Government links</div>
                    <div className="gov-list-group">
                        <a className="gov-footer-link" href="https://president.gov.ph/" rel="noopener noreferrer">Office of the President</a>
                        <a className="gov-footer-link" href="http://ovp.gov.ph/" rel="noopener noreferrer">Office of the Vice President</a>
                        <a className="gov-footer-link" href="http://www.senate.gov.ph/" rel="noopener noreferrer">Senate of the Philippines</a>
                        <a className="gov-footer-link" href="https://www.congress.gov.ph/" rel="noopener noreferrer">House of Representatives</a>
                        <a className="gov-footer-link" href="http://sc.judiciary.gov.ph/" rel="noopener noreferrer">Supreme Court</a>
                        <a className="gov-footer-link" href="https://ca.judiciary.gov.ph/" rel="noopener noreferrer">Court of Appeals</a>
                        <a className="gov-footer-link" href="http://sb.judiciary.gov.ph/" rel="noopener noreferrer">Sandiganbayan</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovComponent;
