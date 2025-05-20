import banner from "../../assets/banner-image.svg";

const BannerContainer = () => {
  return (
    <div className="banner-container banner-container-sm">
      <img className="banner-image" src={banner} alt="" />
    </div>
  );
};

export default BannerContainer;
