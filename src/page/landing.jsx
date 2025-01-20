import FeaturedVideos from "../components/FeaturedVideos/FeaturedVideos";
import GovComponent from "../components/GovComponent/GovComponent";
import HeaderHero from "../components/HeaderHero/HeaderHero";
import MccCorner from "../components/MccCorner/MccCorner";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import Contact from "../components/Contact/Contact";
import Careers from "../components/Careers/Careers";
import Header from "../components/Header/Header";
import Agency from "../components/Agency/Agency";
import News from "../components/News/News";
import Auth from "../components/Auth/Auth";
import { useState } from "react";

const Landing = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header onClick={handleOpen} />
      <HeaderHero />
      <News />
      <FeaturedVideos />
      <MoreInfo />
      <Careers />
      <MccCorner />
      <Contact />
      <Agency />
      <GovComponent />
      <Auth open={open} setOpen={setOpen} handleClose={handleClose} />
    </>
  );
};

export default Landing;
