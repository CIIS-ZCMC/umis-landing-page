import React from 'react';
import usersIcon from '../../assets/more-info/users-1.svg';
import procurementIcon from '../../assets/more-info/icon.svg';
import gadIcon from '../../assets/more-info/heart-1.svg';
import petroIcon from '../../assets/more-info/trending-up-1.svg';
import openIcon from '../../assets/more-info/open-1.svg';

const MoreInfo = () => {
  const MoreInfo = [
    {
      title: 'Citizen’s charter',
      description: 'A one-stop document to learn more about ZCMC’s current standards for rendering services to clients.',
      linkText: 'Read the document',
      linkIcon: openIcon,
      icon: usersIcon
    },

    {
      title: 'Procurement services',
      description: 'See how sourcing, acquiring, and paying for hospital goods and services are processed by ZCMC.',
      linkText: 'See procurement services',
      linkIcon: openIcon,
      icon: procurementIcon
    },

    {
      title: 'GAD corner',
      description: 'See how ZCMC upholds and promotes women’s empowerment towards improving their potentials.',
      linkText: 'Read more about GAD',
      linkIcon: openIcon,
      icon: gadIcon
    },

    {
      title: 'ZCMC - PETRO',
      description: 'Learn more about how professional training is conducted and maintained for HR development.',
      linkText: 'Open the PETRO website',
      linkIcon: openIcon,
      icon: petroIcon
    },
  ];

  return (
    <div className="more-info">
      <div className="arrow-down-more-info"></div>
      
      <div className="more-info-heading">
        <div className="div-2">
          <p className="body-caption">
            More information
          </p>
          <div className="text-wrapper-5">
            Looking for something else?
          </div>
        </div>
      </div>

      <div className="more-info-card-list">

        {MoreInfo.map((info, index) => (
          <div className="card" key={index}>

            <div className="more-info-card-icon-bg">
              <img className="more-info-card-icon" src={info.icon} alt={info.title} />
            </div>

            <div className="div-4">
              <div className="text">
                {info.title}
              </div>

              <p className="more-info-card-description">
                {info.description}
              </p>

              <div className="more-info-card-action">
                <a className="more-info-card-link" href="" rel="noopener noreferrer">
                  {info.linkText}
                  <img className="open" src={info.linkIcon} alt="Open" />
                </a>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default MoreInfo;
