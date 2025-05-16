import { Link } from "react-router-dom";

import Paragraph from "../Paragraph/Paragraph";
import fileArrowDown from "../../assets/file-arrow-down.svg";

const UserManual = () => {
  const manualsContent = [
    {
      title: "Filing a Stock Position",
      date: "May 16, 2025",
      time: "2:34 pm",
      link: "/files/user-manuals/stock-position.pdf",
    },
    {
      title: "Filing a Purchase Request",
      date: "May 16, 2025",
      time: "2:34 pm",
      link: "/files/user-manuals/purchase-request.pdf",
    },
    // {
    //   title: "Sample User Manual 03",
    //   date: "August 12, 2023",
    //   time: "10:03 am",
    //   link: "",
    // },
    // {
    //   title: "Sample User Manual 04",
    //   date: "August 13, 2023",
    //   time: "10:04 am",
    //   link: "",
    // },
    // {
    //   title: "Sample User Manual 05",
    //   date: "August 14, 2023",
    //   time: "10:05 am",
    //   link: "",
    // },
    // {
    //   title: "Sample User Manual 06",
    //   date: "August 15, 2023",
    //   time: "10:06 am",
    //   link: "",
    // },
  ];

  return (
    <div className="user-manuals user-manuals-sm">
      <Paragraph
        text="Documentation"
        className="contact-caption contact-caption-sm"
      />
      <div className="user-manuals-body user-manuals-body-sm">
        <div className="user-manuals-heading user-manuals-heading-sm">
          <h4 className="user-manuals-title user-manuals-title-sm">
            User manuals
          </h4>
          <Paragraph
            text="Get access to user manuals for all of our systems in one place."
            className="user-manuals-description user-manuals-description-sm"
          />
        </div>

        <hr className="start-page-divider start-page-divider-sm" />

        <div className="memo-announcement">
          <div className="memo-announcement-column">
            {manualsContent.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                className="memo-announcement-card"
                key={index}
              >
                <div className="memo-card-content">
                  <Paragraph
                    text={item.title}
                    className="memo-announcement-card-title"
                  />
                  <span className="memo-announcement-date-published">
                    <Paragraph
                      text={item.date}
                      className="memo-announcement-card-date"
                    />
                    <Paragraph
                      text=" · PDF"
                      className="memo-announcement-card-time"
                    />
                  </span>
                </div>
                <div className="memo-file-icon">
                  <img src={fileArrowDown} alt="Download icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
