import React from "react";
import Paragraph from "../Paragraph/Paragraph";

// Reusable VideoFrame component
const VideoFrame = ({ src, className }) => (
  <iframe
    className={className}
    loading="lazy"
    src={`${src}&show_text=false`}
    style={{ overflow: "hidden" }}
    scrolling="no"
    frameBorder="0"
    allowFullScreen
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  />
);

const FeaturedVideos = () => {
  // Video URLs
  const videoSrc1 =
    "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1065102648340577&show_text=false&width=500";
  const videoSrc2 =
    "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1068527114364410&show_text=false&width=500";
  const videoSrc3 =
    "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1662038104367669&show_text=false&width=500";
  const videoSrc4 =
    "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=1065102648340577&show_text=false&width=500";

  return (
    <div className="videos">
      <div className="arrow-down arrow-down-videos"></div>
      <div className="videos-heading">
        <Paragraph text="Featured videos" className="videos-title" />
        <Paragraph
          text="Explore our featured videos at ZCMC, where we showcase expert insights, events, patient stories, and innovative healthcare practices that highlight our commitment and dedication."
          className="videos-heading-description"
        />
      </div>

      <div className="featured-videos-container">
        <div className="featured-videos-group">
          <VideoFrame className="featured-video-left" src={videoSrc1} />
          <VideoFrame className="featured-video-right" src={videoSrc2} />
        </div>

        <div className="featured-videos-group">
          <VideoFrame className="featured-video-left" src={videoSrc3} />
          <VideoFrame className="featured-video-right" src={videoSrc4} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideos;