import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../styles/breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { label: "Home", url: "/" },
    ...pathnames.map((value, index) => {
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;
      return { label: value, url };
    }),
  ];

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb">
        <Link to="/" className="h" rel="noopener noreferrer">
          <svg
            className="home-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.54952 0.531895C8.38743 -0.174695 9.61257 -0.174694 10.4505 0.531896L17.2005 6.224C17.7074 6.65152 18 7.2809 18 7.94406L18 17.2539C18 18.2204 17.2165 19.0039 16.25 19.0039H12.75C11.7835 19.0039 11 18.2204 11 17.2539L11 12.2468C11 12.1088 10.8881 11.9968 10.75 11.9968H7.24999C7.11192 11.9968 6.99999 12.1088 6.99999 12.2468L6.99999 17.2539C6.99999 18.2204 6.2165 19.0039 5.25 19.0039H1.75C0.783502 19.0039 0 18.2204 0 17.2539V7.94406C0 7.2809 0.292551 6.65152 0.799517 6.224L7.54952 0.531895ZM9.48349 1.6786C9.20419 1.44307 8.79581 1.44307 8.5165 1.6786L1.76651 7.37071C1.59752 7.51321 1.5 7.72301 1.5 7.94406L1.5 17.2539C1.5 17.392 1.61193 17.5039 1.75 17.5039H5.25C5.38807 17.5039 5.49999 17.392 5.49999 17.2539L5.49999 12.2468C5.49999 11.2803 6.2835 10.4968 7.24999 10.4968H10.75C11.7165 10.4968 12.5 11.2803 12.5 12.2468L12.5 17.2539C12.5 17.392 12.6119 17.5039 12.75 17.5039H16.25C16.3881 17.5039 16.5 17.392 16.5 17.2539L16.5 7.94406C16.5 7.72301 16.4025 7.51321 16.2335 7.37071L9.48349 1.6786Z" />
          </svg>
        </Link>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link
                  to={breadcrumb.url}
                  className="home"
                  rel="noopener noreferrer"
                >
                  {breadcrumb.label}
                </Link>

                <span className="slash">&gt;</span>
              </>
            ) : (
              <span className="link">{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;