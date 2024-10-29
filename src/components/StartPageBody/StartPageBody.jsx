import React from "react";
import StartPageContainer from "./StartPageContainer";

import cardIcon from "../../assets/more-info/open-1.svg";
import messageIcon from "../../assets/message-circle.svg";
import phoneCall from "../../assets/phone-call.svg";
import PurchaseTrackerContainer from "./PurchaseTrackerContainer";

const StartPage = () => {
  return (
    <div>
      <StartPageContainer />

      <div class="start-page">
        <div class="arrow-down-start-page"></div>

        <div class="tools-information-systems">
          <h5 class="label">Monitoring tools</h5>

          <div class="row">
            <div class="card">
              <span class="system-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M25.3333 4H6.66667C5.2 4 4.01333 5.2 4.01333 6.66667L4 25.3333C4 26.8 5.2 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V6.66667C28 5.2 26.8 4 25.3333 4ZM25.3333 25.3333H6.66667V6.66667H25.3333V25.3333ZM14 22.6667H18V18H22.6667V14H18V9.33333H14V14H9.33333V18H14V22.6667Z"
                    fill="#0F5721"
                  />
                </svg>
              </span>
              <div class="card-content">
                <div class="card-heading">
                  <p class="title">Home care form</p>
                  <p class="description">
                    Enroll patients being discharged who require continued
                    medication and monitoring at home to accurately collect and
                    record information.
                  </p>
                </div>
                <a href="" class="link-with-trailing-icon">
                  Open form
                  <img src={cardIcon} alt="" />
                </a>
              </div>
            </div>

            <div class="card">
              <span class="system-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M25.3333 4.00065H24V1.33398H21.3333V4.00065H10.6667V1.33398H8V4.00065H6.66667C5.2 4.00065 4 5.20065 4 6.66732V25.334C4 26.8006 5.2 28.0006 6.66667 28.0006H25.3333C26.8 28.0006 28 26.8006 28 25.334V6.66732C28 5.20065 26.8 4.00065 25.3333 4.00065ZM25.3333 25.334H6.66667V12.0007H25.3333V25.334ZM6.66667 9.33398V6.66732H25.3333V9.33398H6.66667ZM9.33333 14.6673H22.6667V17.334H9.33333V14.6673ZM9.33333 20.0007H18.6667V22.6673H9.33333V20.0007Z"
                    fill="#0F5721"
                  />
                </svg>
              </span>
              <div class="card-content">
                <div class="card-heading">
                  <p class="title">Hemodialysis notification form</p>
                  <p class="description">
                    Submit a hemodialysis notification form for patients who
                    require hemodialysis, which are subject to be scheduled if
                    condition warrants.
                  </p>
                </div>
                <a
                  href=""
                  class="link-with-trailing-icon"
                  rel="noopener noreferrer"
                >
                  Open form
                  <img src={cardIcon} alt="" />
                </a>
              </div>
            </div>

            <div class="card">
              <span class="system-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 1.33398L4 6.66732V14.6673C4 22.0673 9.12 28.9873 16 30.6673C22.88 28.9873 28 22.0673 28 14.6673V6.66732L16 1.33398ZM25.3333 14.6673C25.3333 20.694 21.36 26.254 16 27.9073C10.64 26.254 6.66667 20.694 6.66667 14.6673V8.40065L16 4.25398L25.3333 8.40065V14.6673ZM9.88 15.454L8 17.334L13.3333 22.6673L24 12.0007L22.12 10.1073L13.3333 18.894L9.88 15.454Z"
                    fill="#0F5721"
                  />
                </svg>
              </span>
              <div class="card-content">
                <div class="card-heading">
                  <p class="title">Infection control</p>
                  <p class="description">
                    See the ZCMC's current total Purchase Requests and the
                    percentage of Purchase Request over allocated budget.
                  </p>
                </div>
                <p class="link-with-trailing-icon-disabled">Coming soon</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="card">
              <span class="system-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M26.6667 3.99998H25.3333V1.33331H22.6667V3.99998H9.33333V1.33331H6.66666V3.99998H5.33333C3.86666 3.99998 2.66666 5.19998 2.66666 6.66665V28C2.66666 29.4666 3.86666 30.6666 5.33333 30.6666H26.6667C28.1333 30.6666 29.3333 29.4666 29.3333 28V6.66665C29.3333 5.19998 28.1333 3.99998 26.6667 3.99998ZM26.6667 28H5.33333V13.3333H26.6667V28ZM26.6667 10.6666H5.33333V6.66665H26.6667V10.6666Z"
                    fill="#0F5721"
                  />
                </svg>
              </span>
              <div class="card-content">
                <div class="card-heading">
                  <p class="title">Sentinel events</p>
                  <p class="description">
                    See the ZCMC's current total Purchase Requests and the
                    percentage of Purchase Request over allocated budget.
                  </p>
                </div>
                <p class="link-with-trailing-icon-disabled">Coming soon</p>
              </div>
            </div>

            <div class="card">
              <span class="system-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M25.2266 16.0007C25.2799 16.4406 25.3333 16.8807 25.3333 17.334C25.3333 20.1073 24.2666 22.6273 22.5333 24.5206C22.1866 23.4406 21.1999 22.6673 19.9999 22.6673H18.6666V18.6673C18.6666 17.934 18.0666 17.334 17.3333 17.334H9.33325V14.6673H11.9999C12.7333 14.6673 13.3333 14.0673 13.3333 13.334V10.6673H15.9999C17.4666 10.6673 18.6666 9.46732 18.6666 8.00065V4.61398C17.3999 4.21398 16.0666 4.00065 14.6666 4.00065C7.30658 4.00065 1.33325 9.97398 1.33325 17.334C1.33325 24.694 7.30658 30.6673 14.6666 30.6673C22.0266 30.6673 27.9999 24.694 27.9999 17.334C27.9999 16.8807 27.9733 16.4406 27.9333 16.0007H25.2266ZM13.3333 27.9073C8.06658 27.254 3.99992 22.774 3.99992 17.334C3.99992 16.5073 4.10659 15.7207 4.27992 14.9473L10.6666 21.334V22.6673C10.6666 24.134 11.8666 25.334 13.3333 25.334V27.9073ZM29.3333 5.33398V4.66732C29.3333 2.82732 27.8399 1.33398 25.9999 1.33398C24.1599 1.33398 22.6666 2.82732 22.6666 4.66732V5.33398C21.9333 5.33398 21.3333 5.93398 21.3333 6.66732V12.0007C21.3333 12.734 21.9333 13.334 22.6666 13.334H29.3333C30.0666 13.334 30.6666 12.734 30.6666 12.0007V6.66732C30.6666 5.93398 30.0666 5.33398 29.3333 5.33398ZM27.9999 5.33398H23.9999V4.66732C23.9999 3.56065 24.8933 2.66732 25.9999 2.66732C27.1066 2.66732 27.9999 3.56065 27.9999 4.66732V5.33398Z"
                    fill="#0F5721"
                  />
                </svg>
              </span>
              <div class="card-content">
                <div class="card-heading">
                  <p class="title">Safety and environment</p>
                  <p class="description">
                    See the ZCMC's current total Purchase Requests and the
                    percentage of Purchase Request over allocated budget.
                  </p>
                </div>
                <p class="link-with-trailing-icon-disabled">Coming soon</p>
              </div>
            </div>

            <PurchaseTrackerContainer />
          </div>
        </div>

        <div class="feedback">
          <h5 class="label">Connect with us</h5>
          <div class="row">
            <div class="card feedback-card">
              <div class="feedback-heading">
                <p class="feedback-title">Have any concerns with UMIS?</p>
                <p class="description">
                  Your feedback will help us on improving your overall
                  experiences.
                </p>
              </div>
              <a
                href=""
                class="link-with-trailing-icon"
                rel="noopener noreferrer"
              >
                Report an issue
                <img src={messageIcon} alt="" />
              </a>
            </div>

            <div class="card feedback-card">
              <div class="feedback-heading">
                <p class="feedback-title">Need some help? Talk to us</p>
                <p class="description">
                  Our friendly team is here to help you. You may call us via
                  telephone.
                </p>
              </div>
              <a
                href="tel:262"
                class="link-with-trailing-icon"
                rel="noopener noreferrer"
              >
                IISU local - (262)
                <img src={phoneCall} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
