import React from "react";

import cardIcon from "../../assets/more-info/open-1.svg";
import useUserHook from "../../hooks/UserHook";
import { config, getRedcapFormsUrlByCode } from "../../utils/RetrieveSystemURL";

const HomeCareForm = () => {
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
            d="M25.3333 4H6.66667C5.2 4 4.01333 5.2 4.01333 6.66667L4 25.3333C4 26.8 5.2 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V6.66667C28 5.2 26.8 4 25.3333 4ZM25.3333 25.3333H6.66667V6.66667H25.3333V25.3333ZM14 22.6667H18V18H22.6667V14H18V9.33333H14V14H9.33333V18H14V22.6667Z"
            fill="#0F5721"
          />
        </svg>
      </span>
      <div class="card-content">
        <div class="card-heading">
          <p class="title">Home care form</p>
          <p class="description">
            Enroll patients being discharged who require continued medication
            and monitoring at home to accurately collect and record information.
          </p>
        </div>
        <a
          href={
            user !== null
              ? getRedcapFormsUrlByCode(user.redcap_forms, "HCF")
              : config.development.prm
          }
          class="link-with-trailing-icon"
        >
          Open form
          <img src={cardIcon} alt="" />
        </a>
      </div>
    </div>
  );
};

export default HomeCareForm;
