import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph.jsx";
import SegmentedButtonMemo from "../SegmentedButtonMemo/SegmentedButtonMemo.jsx";
import useAnnouncementHook from "../../hooks/AnnouncementHook.jsx";
import axios from "axios";
import useMemorandumHook from "../../hooks/MemorandumHook.jsx";

const MemoAnnouncement = () => {
  const { announcements = [], getAnnouncement } = useAnnouncementHook();
  const { memorandums = [], getMemorandum } = useMemorandumHook();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (
      Array.isArray(announcements) &&
      announcements.length === 0 &&
      typeof getAnnouncement === "function"
    ) {
      getAnnouncement((status, feedback) => {
        if (!(status >= 200 && status < 300)) {
          console.log(feedback);
        }
      });
    }

    if (
      Array.isArray(memorandums) &&
      memorandums.length === 0 &&
      typeof getMemorandum === "function"
    ) {
      getMemorandum((status, feedback) => {
        if (!(status >= 200 && status < 300)) {
          console.log(feedback);
        }
      });
    }

    return () => cancelToken.cancel();
  }, []);

  return (
    <div className="contact-us contact-us-sm memo">
      <Paragraph
        text="Don’t miss out"
        className="contact-caption contact-caption-sm"
      />
      <div className="contact-us-body contact-us-body-sm">
        <div className="contact-us-heading contact-us-heading-sm">
          <h4 className="contact-us-title contact-us-title-sm">
            Stay up to date
          </h4>
          <Paragraph
            text="Archives published within the last 6 months appear here."
            className="contact-us-description contact-us-description-sm"
          />
        </div>

        <hr className="start-page-divider start-page-divider-sm" />

        <div className="memo-announcement">
          <div className="memo-announcement-sm">
            <SegmentedButtonMemo
              announcements={Array.isArray(announcements) ? announcements : []}
              memorandums={Array.isArray(memorandums) ? memorandums : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoAnnouncement;
