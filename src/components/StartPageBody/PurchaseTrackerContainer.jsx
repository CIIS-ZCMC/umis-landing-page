import React from "react";

import { config, getSystemUrlByCode } from "../../utils/RetrieveSystemURL";
import cardIcon from "../../assets/more-info/open-1.svg";
import PurchaseTracker from "./PurchaseTrackerContainer";
import useUserHook from "../../hooks/UserHook";

const PurchaseTrackerContainer = () => {
  const { user } = useUserHook();

  return (
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
            d="M30.6666 10.6667C30.6666 12.1333 29.4666 13.3333 27.9999 13.3333C27.7599 13.3333 27.5333 13.3067 27.3199 13.24L22.5733 17.9733C22.6399 18.1867 22.6666 18.4267 22.6666 18.6667C22.6666 20.1333 21.4666 21.3333 19.9999 21.3333C18.5333 21.3333 17.3333 20.1333 17.3333 18.6667C17.3333 18.4267 17.3599 18.1867 17.4266 17.9733L14.0266 14.5733C13.8133 14.64 13.5733 14.6667 13.3333 14.6667C13.0933 14.6667 12.8533 14.64 12.6399 14.5733L6.57325 20.6533C6.63992 20.8667 6.66658 21.0933 6.66658 21.3333C6.66658 22.8 5.46659 24 3.99992 24C2.53325 24 1.33325 22.8 1.33325 21.3333C1.33325 19.8667 2.53325 18.6667 3.99992 18.6667C4.23992 18.6667 4.46659 18.6933 4.67992 18.76L10.7599 12.6933C10.6933 12.48 10.6666 12.24 10.6666 12C10.6666 10.5333 11.8666 9.33333 13.3333 9.33333C14.7999 9.33333 15.9999 10.5333 15.9999 12C15.9999 12.24 15.9733 12.48 15.9066 12.6933L19.3066 16.0933C19.5199 16.0267 19.7599 16 19.9999 16C20.2399 16 20.4799 16.0267 20.6933 16.0933L25.4266 11.3467C25.3599 11.1333 25.3333 10.9067 25.3333 10.6667C25.3333 9.2 26.5333 8 27.9999 8C29.4666 8 30.6666 9.2 30.6666 10.6667Z"
            fill="#0F5721"
          />
        </svg>
      </span>
      <div class="card-content">
        <div class="card-heading">
          <p class="title">Purchase request tracking</p>
          <p class="description">
            See the ZCMC's current total Purchase Requests and the percentage of
            Purchase Request over allocated budget.
          </p>
        </div>
        <a
          href={
            user !== null
              ? getSystemUrlByCode(user.side_bar_details.system, "PRM")
              : config.development.prm
          }
          class="link-with-trailing-icon"
          rel="noopener noreferrer"
        >
          Go to tracker
          <img src={cardIcon} alt="" />
        </a>
      </div>
    </div>
  );
};

export default PurchaseTrackerContainer;
