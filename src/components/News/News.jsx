import React from "react";
import env from "../../assets/news/env.jpg";
import sampleNewsImg from "../../assets/news/sample-news-img.png";
import HealthNewsItem from "./HealthNewsItem";
import NewsItem from "./NewsItem";

const News = () => {
  return (
    <div className="news">
      <div className="arrow-down-news"></div>
      <div className="latest-news">
        <div className="heading">
          <div className="subheading">Fresh updates</div>
          <div className="text-wrapper-5">Latest news on ZCMC</div>
          <p className="news-heading-description">
            Stay in the loop with our fresh updates! Discover the latest trends,
            insights, and highlights on ZCMC. Don’t miss out on what’s happening
            now.
          </p>
        </div>
        <div className="news-container">
          <div className="highlighted-item">
            <img className="highlighted-item-image" src={env} alt="" />
            <div className="content">
              <div className="div-2">
                <div className="text-wrapper-7">Published August 10, 2023</div>
                <p className="text-wrapper-8">
                  Strategic and Environment Unit achieves 100% of the target
                  strategic deliverables for 2023!
                </p>
              </div>
              <p className="description">
                ZCMC Hospital Week 2024 Opening Salvo! The excitement kicked off
                in grand style...
              </p>
            </div>
          </div>
          <NewsItem />
        </div>
      </div>

      <div className="health-news">
        <div className="heading">
          <div className="text-wrapper-12">Health news on ZCMC</div>
          <p className="health-news-heading-description">
            Stay informed with the latest updates in health news! Join us as we
            explore everything from nutrition and fitness to mental health and
            medical breakthroughs.
          </p>
        </div>
        <HealthNewsItem />
      </div>
    </div>
  );
};

export default News;
