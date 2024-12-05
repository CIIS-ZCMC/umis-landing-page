import React from "react";

const FeaturedVideos = () => {
  return (
    <div className="videos">
      <div className="arrow-down arrow-down-videos"></div>
      <div className="videos-heading">
        <div className="videos-title">Featured videos</div>
        <p className="videos-heading-description">
          Explore our featured videos at ZCMC, where we showcase expert insights, events, patient stories,
          and innovative healthcare practices that highlight our commitment and dedication.
        </p>
      </div>

      <div className="container-5">
        <div className="container-6">
          <iframe
            className="featured-video-left"
            loading="lazy"
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpaccu.zcmc%2Fvideos%2F1065102648340577%2F&amp;show_text=false"
            style={{ overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>

          <iframe
            className="featured-video-right"
            loading="lazy"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphu.zcmc%2Fposts%2Fpfbid02CHbGiD6kxtyd7uysq8N6ycBbubMFhTTcEa7urko9UjUgYiTaQMvbW55KXiderQ6pl&amp;show_text=false&amp;"
            style={{ overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="container-6">
          <iframe
            className="featured-video-left"
            loading="lazy"
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpaccu.zcmc%2Fvideos%2F1065102648340577%2F&amp;show_text=false"
            style={{ overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
          <iframe
            className="featured-video-right"
            loading="lazy"
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fphu.zcmc%2Fposts%2Fpfbid02CHbGiD6kxtyd7uysq8N6ycBbubMFhTTcEa7urko9UjUgYiTaQMvbW55KXiderQ6pl&amp;show_text=false&amp;"
            style={{ overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideos;
