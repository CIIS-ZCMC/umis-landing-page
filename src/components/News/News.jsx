import React, { useState, useEffect } from "react";

import Paragraph from "../Paragraph/Paragraph";

import env from "../../assets/news/env.jpg";
import HealthNewsItem from "./HealthNewsItem";
import NewsItem, { STATIC_NEWS_ITEMS } from "./NewsItem";
import { fetchZcmcDohLiveFeed } from "../../utils/zcmcDohScraper";
import "../../styles/news.css";

const STATIC_FEATURED_NEWS = {
  date: "August 10, 2023",
  title:
    "Strategic and Environment Unit achieves 100% of the target strategic deliverables for 2023!",
  description:
    "ZCMC Hospital Week 2024 Opening Salvo! The excitement kicked off in grand style...",
  image: env,
  highResImage: env,
  link: "",
};

const News = () => {
  const [featuredNews, setFeaturedNews] = useState(STATIC_FEATURED_NEWS);
  const [recentNews, setRecentNews] = useState(STATIC_NEWS_ITEMS);

  useEffect(() => {
    let isMounted = true;
    fetchZcmcDohLiveFeed()
      .then((feed) => {
        if (!isMounted) return;
        if (feed?.newsPosts && feed.newsPosts.length > 0) {
          const [firstPost, ...restPosts] = feed.newsPosts;
          setFeaturedNews({
            date: firstPost.date || STATIC_FEATURED_NEWS.date,
            title: firstPost.title || STATIC_FEATURED_NEWS.title,
            description:
              firstPost.description ||
              firstPost.title ||
              STATIC_FEATURED_NEWS.description,
            image: firstPost.image || env,
            highResImage: firstPost.highResImage || firstPost.image || env,
            link: firstPost.link || "https://zcmc.doh.gov.ph/",
          });
          if (restPosts.length > 0) {
            setRecentNews(restPosts);
          }
        }
      })
      .catch(() => {
        // Safe fallback to static news
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFeaturedImgError = (e) => {
    const imgEl = e.currentTarget;
    if (
      featuredNews.image &&
      imgEl.src !== featuredNews.image &&
      imgEl.src !== env
    ) {
      imgEl.src = featuredNews.image;
    } else if (imgEl.src !== env) {
      imgEl.src = env;
    }
  };

  const renderHighlightedCard = (titleClassName, includeExtraMobileDescription = false) => {
    const cardInner = (
      <>
        <img
          className="highlighted-item-image"
          src={featuredNews.highResImage || featuredNews.image || env}
          alt={featuredNews.title}
          onError={handleFeaturedImgError}
          style={{
            objectFit: "cover",
            maxHeight: "400px",
            width: "100%",
          }}
        />
        <div className="content">
          <div className="div-2">
            <div className="publish-date-container">
              <Paragraph text="Published" className="publish-date-text" />
              <Paragraph
                text={featuredNews.date}
                className="publish-date-text"
              />
            </div>
            <Paragraph text={featuredNews.title} className={titleClassName} />
          </div>
          <Paragraph
            text={featuredNews.description}
            className="description"
          />
        </div>
        {includeExtraMobileDescription && (
          <p className="description">{featuredNews.description}</p>
        )}
      </>
    );

    if (featuredNews.link) {
      return (
        <a
          className="highlighted-item"
          href={featuredNews.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
        >
          {cardInner}
        </a>
      );
    }

    return <div className="highlighted-item">{cardInner}</div>;
  };

  return (
    <div className="news">
      <div>
        <div>
          <div className="arrow-down-news"></div>
          <div className="latest-news">
            <div className="heading">
              <Paragraph text="Fresh updates" className="subheading" />
              <Paragraph
                text="Latest news on ZCMC"
                className="text-wrapper-5"
              />
              <Paragraph
                text="Stay in the loop with our fresh updates! Discover the latest trends, insights, and highlights on ZCMC. Don’t miss out on what’s happening now."
                className="news-heading-description"
              />
            </div>

            <div className="news-container">
              {renderHighlightedCard("news-item-name", false)}
              <NewsItem items={recentNews} />
            </div>
          </div>

          <div className="health-news">
            <div className="heading">
              <Paragraph
                text="Health news on ZCMC"
                className="text-wrapper-12"
              />
              <Paragraph
                text="Stay informed with the latest updates in health news! Join us as we explore everything from nutrition and fitness to mental health and medical breakthroughs."
                className="health-news-heading-description"
              />
            </div>
            <HealthNewsItem />
          </div>
        </div>

        <div className="news-container">
          {renderHighlightedCard("text-wrapper-8", true)}
        </div>
        <NewsItem items={recentNews} />
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
