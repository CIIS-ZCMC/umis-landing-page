import React, { useState } from 'react';
import announcmentIcon from '../../assets/megaphone-loud.svg';

const StartPageContainer = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleReadAnnouncement = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up
    setIsVisible(true);
  };

  return (
    <div className="start-page-container"> 
      <div className="start-page-intro">
        <div className="start-page-content">
          <div className="heading">
            <p className="subheading">Welcome to One ZCMC</p>
            <p className="text-wrapper-5">All you need, in one portal</p>
            <p className="start-page-heading-description">
              Get access to all information systems and applications, information and resources
              readily available for you.
            </p>
          </div>

          <div className="cta-container">
            <a className="CTA" href="http://192.168.5.1:8080/login" rel="noopener noreferrer">
              Go to UMIS
            </a>
            <button className="secondary-CTA" id="read-announcement" onClick={handleReadAnnouncement}>
              Read announcement
            </button>
          </div>

          <div className='announcement-date-container'>
            <p className='announcement-date'>
              Announcements last updated on: August 10, 2023
            </p>
          </div>
        </div>
      </div>

      {isVisible && ( // Conditional rendering based on isVisible state
        <div className={`announcement-backdrop ${isVisible ? 'visible' : ''}`} id="announcement-backdrop">
          <div className="announcement">
            <div className="content">
              <div className="announcement-heading">
                <div className="label-with-trailing-icon">
                  <p className="announcement-label">Announcement</p>
                  <img src={announcmentIcon} alt="" />
                </div>
                <small className="announcement-publish-date">
                  Published on August 10, 2023 - IISU
                </small>
              </div>
              <hr className="announcement-divider" />
              <p id="announcement-description">
                Dear Users,
                <br />
                <br />
                We are aware of an issue affecting the Daily Time Record (DTR) display for the period of July 1-15, where some users may see "Absent" incorrectly marked on their records.
                <br />
                <br />
                Please rest assured that there is no need for concern. We are currently updating the system, specifically in handling the schedule to include new information in the DTR viewing. Your biometric data has been accurately recorded and stored in our database; the current absence display is due to these ongoing updates.
                <br />
                <br />
                Once the updates are completed, the DTR view will return to normal, reflecting your accurate attendance records.
                <br />
                <br />
                We appreciate your understanding and patience during this time.
                <br />
                <br />
                <br />
                Best regards,
                <br />
                <br />
                Innovations and Information Systems Unit (IISU)
              </p>
              <hr className="announcement-divider" />
              <button className="CTA" id="announcement-CTA" onClick={handleDismiss}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartPageContainer;