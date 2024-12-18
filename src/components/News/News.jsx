import React from "react";

import Paragraph from "../Paragraph/Paragraph";

import env from "../../assets/news/env.jpg";
import HealthNewsItem from "./HealthNewsItem";
import NewsItem from "./NewsItem";

const News = () => {
  return (
    <div className="news">
      <div className="arrow-down-news"></div>
      <div className="latest-news">
        <div className="heading">
          <Paragraph text="Fresh updates" className="subheading" />
          <Paragraph text="Latest news on ZCMC" className="text-wrapper-5" />
          <Paragraph
            text="Stay in the loop with our fresh updates! Discover the latest trends, insights, and highlights on ZCMC. Don’t miss out on what’s happening now."
            className="news-heading-description"
          />
        </div>

        <div className="news-container">
          <div className="highlighted-item">
            <img className="highlighted-item-image" src={env} alt="" />
            <div className="content">
              <div className="div-2">
                <div className="publish-date-container">
                  <Paragraph text="Published" className="publish-date-text" />
                  <Paragraph
                    text="August 10, 2023"
                    className="publish-date-text"
                  />
                </div>
                <Paragraph
                  text="Strategic and Environment Unit achieves 100% of the target strategic deliverables for 2023!"
                  className="text-wrapper-8"
                />
              </div>
              <Paragraph
                text="ZCMC Hospital Week 2024 Opening Salvo! The excitement kicked off in grand style..."
                className="description"
              />
            </div>
          </div>
          <NewsItem />
        </div>
      </div>

      <div className="health-news">
        <div className="heading">
          <Paragraph text="Health news on ZCMC" className="text-wrapper-12" />
          <Paragraph
            text="Stay informed with the latest updates in health news! Join us as we explore everything from nutrition and fitness to mental health and medical breakthroughs."
            className="health-news-heading-description"
          />
        </div>
        <HealthNewsItem />
      </div>
    </div>
  );
};

export default News;
