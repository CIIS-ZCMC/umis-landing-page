import React from 'react';
import careersImg from '../../assets/careers/lp-bg.jpg'; // Update the path accordingly
import openIcon from '../../assets/careers/open-4.svg'; // Update the path accordingly

const Careers = () => {
  return (
    <div className="careers">
      <div className="arrow-down-careers"></div>
      <img className="careers-img" src={careersImg} alt="Careers" />
      <div className="careers-container">
        <div className="container-fit">
          <div className="careers-heading">
            <p className="body-caption">Job opportunities</p>
            <p className="careers-heading-title">
              We’re looking for talented people
            </p>
            <p className="careers-heading-description">
              Explore through Zamboanga City Medical Center’s job vacancy invitation postings with complete
              information about requirements, application process and more.
            </p>
          </div>
          <ul className="chip-list">
            <li className="chip chip-danger">Medical</li>
            <li className="chip chip-success">Administrative</li>
            <li className="chip chip-neutral">Technical</li>
          </ul>
          <hr className="divider" />
          <a className="CTA" href="" rel="noopener noreferrer">
            Go to job postings
            <img className="open-2" src={openIcon} alt="Open" />
          </a>
        </div>
      </div>
      <style jsx>{`
        .careers {
          background: var(--color-systembase-colorsbg-light-100-f6f6f6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          position: relative;
          flex: 0 0 auto;
          z-index: 3;
        }

        .careers-img {
          position: relative;
          flex: 1;
          flex-grow: 1;
          background-color: var(--color-systembase-colorsbg-white-100-ffffff);
          border-radius: 12px;
          border: 4px solid var(--color-systembase-colorsbg-light-100-f6f6f6);
          box-shadow: 0px 4px 32px 0px rgba(13, 13, 13, 0.10);
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        .careers-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 32px;
          flex: 1;
        }

        .container-fit {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .careers-heading {
          display: flex;
          flex-direction: column;
          width: 560px;
          align-items: flex-start;
          gap: 12px;
        }

        .careers-heading-title {
          font-weight: 600;
          color: var(--color-systemneutralsneutrals-900-1a1a1a);
          font-size: 32px;
          line-height: 38.4px;
        }

        .careers-heading-description {
          font-weight: 400;
          color: var(--color-systemneutralsneutrals-800-33333);
          font-size: 18px;
          line-height: 30px;
        }

        .chip-list {
          gap: 8px;
          display: inline-flex;
          align-items: center;
        }

        .chip {
          display: flex;
          height: 22px;
          padding: 8px;
          justify-content: center;
          align-items: center;
          border-radius: 16px;
          font-family: Roboto;
          font-size: 12px;
          font-weight: 500;
          background-color: var(--color-systembase-colorsbg-white-100-ffffff);
        }

        .chip-danger {
          color: var(--color-systemdangererror-500-d32f2f);
        }

        .chip-success {
          color: var(--color-systembase-colorsbrand-green-500-0f5721);
        }

        .chip-neutral {
          color: var(--color-systemneutralsneutrals-900-1a1a1a);
        }

        .CTA {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 500;
          color: var(--color-systemprimaryprimary-700-016298);
        }

        .CTA img {
          margin-left: 8px;
        }

        @media only screen and (min-width: 1366px) {
          .careers {
            padding: 72px;
          }
          .careers-img {
            height: 383px;
            width: 540px;
          }
        }

        @media only screen and (min-width: 1530px) {
          .careers {
            padding: 96px;
          }
          .careers-img {
            height: 383px;
            width: 650px;
          }
        }

        @media only screen and (min-width: 1920px) {
          .careers {
            padding: 96px 245px;
          }
          .careers-img {
            height: 383px;
            width: 691px;
          }
        }

        .arrow-down-careers {
          width: 0;
          height: 0;
          border-left: 48px solid transparent;
          border-right: 48px solid transparent;
          position: absolute;
          margin-top: -530px;
          border-top: 48px solid var(--color-systembase-colorsbg-white-100-ffffff);
        }
      `}</style>
    </div>
  );
};

export default Careers;
