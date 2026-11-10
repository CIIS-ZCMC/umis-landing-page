import { ENABLE_CHRISTMAS_THEME, HOLIDAY_CONFIG } from "../../config/holidayConfig";
import ChristmasLights from "./ChristmasLights";
import SnowfallEffect from "./SnowfallEffect";
import PeekingSanta from "./PeekingSanta";
import FilipinoParol from "./FilipinoParol";
import ChristmasMusicPlayer from "./ChristmasMusicPlayer";

const ChristmasTheme = () => {
  // If master toggle is disabled, zero elements or listeners are mounted
  if (!ENABLE_CHRISTMAS_THEME) {
    return null;
  }

  return (
    <>
      {HOLIDAY_CONFIG.fairyLights && <ChristmasLights />}
      {HOLIDAY_CONFIG.snowfall && <SnowfallEffect />}
      {HOLIDAY_CONFIG.filipinoParol && <FilipinoParol />}
      {HOLIDAY_CONFIG.peekingSanta && <PeekingSanta />}
      {HOLIDAY_CONFIG.christmasSoundtrack && <ChristmasMusicPlayer />}
    </>
  );
};

export default ChristmasTheme;
