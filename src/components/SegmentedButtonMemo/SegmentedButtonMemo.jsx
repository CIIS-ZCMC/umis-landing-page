import React, { useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";
import { Box, Typography } from "@mui/material";

import fileArrowDown from "../../assets/file-arrow-down.svg";
import announcementOpen from "../../assets/open.svg";

const SegmentedButtonMemo = ({ announcements = [], memorandums = [] }) => {
  const [selected, setSelected] = useState("announcement"); // Default selection: 'announcement'

  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];
  const safeMemorandums = Array.isArray(memorandums) ? memorandums : [];

  const handleClick = (option) => {
    setSelected(option);
  };

  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return { date: "", time: "" };
    try {
      const dateObj = new Date(dateTimeString);
      if (isNaN(dateObj.getTime())) {
        return { date: String(dateTimeString), time: "" };
      }

      // Format date: August 10, 2023
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Format time: 10:30am
      const formattedTime = dateObj
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();

      return { date: formattedDate, time: formattedTime };
    } catch {
      return { date: String(dateTimeString), time: "" };
    }
  }

  return (
    <div className="segmented-button-container">
      <div className="segmented-button-group">
        <button
          className={`segmented-button ${
            selected === "announcement" ? "selected" : ""
          }`}
          onClick={() => handleClick("announcement")}
        >
          Announcements
        </button>
        <button
          className={`segmented-button ${
            selected === "memorandum" ? "selected" : ""
          }`}
          onClick={() => handleClick("memorandum")}
        >
          Memoranda
        </button>
      </div>

      {/* Content Display */}
      <div className="segmented-button-body">
        <div className="memo-announcement">
          {selected === "announcement" && (
            <div className="memo-announcement-column">
              {safeAnnouncements.length === 0 ? (
                <Box display="flex" justifyContent="center">
                  <Typography sx={{ fontSize: 12, color: "gray" }}>
                    NO ANNOUNCEMENT AVAILABLE
                  </Typography>
                </Box>
              ) : (
                safeAnnouncements.map((item, index) => {
                  const dateTime = item.created_at || item.effective_at;
                  const formatted = dateTime
                    ? formatDateTime(dateTime)
                    : { date: "", time: "" };
                  const date = item.date || formatted.date;
                  const time = item.time || formatted.time;
                  const link =
                    item.link ||
                    (item.attachments && item.attachments[0]?.file_path) ||
                    item.attachment ||
                    "#";

                  return (
                    <Link
                      to={link}
                      className="memo-announcement-card"
                      key={item.id || index}
                      rel="noopener noreferrer"
                    >
                      <div className="memo-card-content">
                        <span className="memo-announcement-date-published">
                          {date && (
                            <Paragraph
                              text={date}
                              className="memo-announcement-card-date"
                            />
                          )}
                          {time && (
                            <Paragraph
                              text={time}
                              className="memo-announcement-card-time"
                            />
                          )}
                        </span>
                        <Paragraph
                          text={item.title || ""}
                          className="memo-announcement-card-title"
                        />
                      </div>
                      <div className="memo-file-icon">
                        <img
                          src={announcementOpen}
                          alt="Open announcement icon"
                        />
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          )}

          {selected === "memorandum" && (
            <div className="memo-announcement-column">
              {safeMemorandums.length === 0 ? (
                <Box display="flex" justifyContent="center">
                  <Typography sx={{ fontSize: 12, color: "gray" }}>
                    NO MEMORANDUM AVAILABLE
                  </Typography>
                </Box>
              ) : (
                safeMemorandums.map((item, index) => {
                  const dateTime = item.effective_at || item.created_at;
                  const formatted = dateTime
                    ? formatDateTime(dateTime)
                    : { date: "", time: "" };
                  const date = item.date || formatted.date;
                  const time = item.time || formatted.time;
                  const link =
                    item.link ||
                    item.attachment ||
                    (item.attachments && item.attachments[0]?.file_path) ||
                    "#";

                  return (
                    <Link
                      to={link}
                      className="memo-announcement-card"
                      key={item.id || index}
                      rel="noopener noreferrer"
                    >
                      <div className="memo-card-content">
                        <span className="memo-announcement-date-published">
                          {date && (
                            <Paragraph
                              text={date}
                              className="memo-announcement-card-date"
                            />
                          )}
                          {time && (
                            <Paragraph
                              text={time}
                              className="memo-announcement-card-time"
                            />
                          )}
                        </span>
                        <Paragraph
                          text={item.title || ""}
                          className="memo-announcement-card-title"
                        />
                      </div>
                      <div className="memo-file-icon">
                        <img src={fileArrowDown} alt="File download icon" />
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentedButtonMemo;
