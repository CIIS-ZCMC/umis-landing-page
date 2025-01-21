import React, { useState } from "react";
import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";
import { Box, Typography } from "@mui/material";

const SegmentedButtonMemo = ({ announcements, memorandums }) => {
  const [selected, setSelected] = useState("announcement"); // Default selection: 'announcement'

  const handleClick = (option) => {
    setSelected(option);
  };

  function formatDateTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);

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
              {announcements.length === 0 ? (
                <Box display="flex" justifyContent="center">
                  <Typography sx={{ fontSize: 12, color: "gray" }}>
                    NO ANNOUNCEMENT AVAILABLE
                  </Typography>
                </Box>
              ) : (
                announcements.map(({ title, link, created_at }, index) => {
                  const { date, time } = formatDateTime(created_at);

                  return (
                    <Link
                      to={link}
                      className="memo-announcement-card"
                      key={index}
                      rel="noopener noreferrer"
                    >
                      <span className="memo-announcement-date-published">
                        <Paragraph
                          text={date}
                          className="memo-announcement-card-date"
                        />
                        <Paragraph
                          text={time}
                          className="memo-announcement-card-time"
                        />
                      </span>
                      <Paragraph
                        text={title}
                        className="memo-announcement-card-title"
                      />
                    </Link>
                  );
                })
              )}
            </div>
          )}

          {selected === "memorandum" && (
            <div className="memo-announcement-column">
              {memorandums.length === 0 ? (
                <Box display="flex" justifyContent="center">
                  <Typography sx={{ fontSize: 12, color: "gray" }}>
                    NO MEMORANDUM AVAILABLE
                  </Typography>
                </Box>
              ) : (
                memorandums.map((item, index) => (
                  <Link
                    to={item.link}
                    className="memo-announcement-card"
                    key={index}
                    rel="noopener noreferrer"
                  >
                    <span className="memo-announcement-date-published">
                      <Paragraph
                        text={item.date}
                        className="memo-announcement-card-date"
                      />
                      <Paragraph
                        text={item.time}
                        className="memo-announcement-card-time"
                      />
                    </span>
                    <Paragraph
                      text={item.title}
                      className="memo-announcement-card-title"
                    />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentedButtonMemo;
