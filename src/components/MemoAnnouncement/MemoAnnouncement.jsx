import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph.jsx";
import SegmentedButtonMemo from "../SegmentedButtonMemo/SegmentedButtonMemo.jsx";
import useAnnouncementHook from "../../hooks/AnnouncementHook.jsx";
import axios from "axios";
import useMemorandumHook from "../../hooks/MemorandumHook.jsx";

const MemoAnnouncement = ({}) => {
  const { announcements, getAnnouncement } = useAnnouncementHook();
  const { memorandums, getMemorandum } = useMemorandumHook();

  const announcementContent = [
    {
      title: "Sample announcement No. 61",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 62",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 63",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 64",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 65",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 61",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 62",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 63",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 64",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "Sample announcement No. 65",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
  ];

  const memorandumContent = [
    {
      title: "ZCMC Hospital Week MO No. 66",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "ZCMC Hospital Week MO No. 67",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "ZCMC Hospital Week MO No. 68",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "ZCMC Hospital Week MO No. 69",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
    {
      title: "ZCMC Hospital Week MO No. 70",
      date: "August 10, 2023",
      time: "10:00 am",
      link: "",
    },
  ];

  const [selected, setSelected] = useState("announcement");

  const handleClick = (option) => {
    setSelected(option);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (announcements.length === 0) {
      getAnnouncement((status, feedback) => {
        if (!(status >= 200 && status < 300)) {
          return console.log(feedback);
        }
      });
    }

    return cancelToken.cancel();
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
              announcements={announcements}
              memorandums={memorandums}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoAnnouncement;
