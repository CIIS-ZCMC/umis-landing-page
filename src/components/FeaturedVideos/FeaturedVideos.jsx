import React from "react";
import Paragraph from "../Paragraph/Paragraph";

const VideoFrame = ({ videoUrl, className }) => {
  const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    videoUrl
  )}&show_text=false&width=500`;
  
  return (
    <iframe
      className={className}
      loading="lazy"
      src={embedUrl}
      style={{ overflow: "hidden" }}
      scrolling="no"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  );
};

const FeaturedVideos = () => {
  const videoUrls = [
    "https://www.facebook.com/watch/?v=1065102648340577",
    "https://www.facebook.com/watch/?v=1068527114364410",
    "https://www.facebook.com/watch/?v=1662038104367669",
    "https://www.facebook.com/watch/?v=1065102648340577",
  ];

  return (
    <div className="videos">
      <div className="arrow-down arrow-down-videos"></div>
      <div className="videos-heading">
        <Paragraph text="Featured videos" className="videos-title" />
        <Paragraph text="" className="videos-heading-description" />
      </div>

      <div className="featured-videos-container">
        <div className="featured-videos-group">
          {videoUrls.slice(0, 2).map((videoUrl, index) => (
            <VideoFrame
              key={index}
              className={`featured-video-${index % 2 === 0 ? "left" : "right"}`}
              videoUrl={videoUrl}
            />
          ))}
        </div>

        <div className="featured-videos-group">
          {videoUrls.slice(2, 4).map((videoUrl, index) => (
            <VideoFrame
              key={index + 2}
              className={`featured-video-${index % 2 === 0 ? "left" : "right"}`}
              videoUrl={videoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideos;
