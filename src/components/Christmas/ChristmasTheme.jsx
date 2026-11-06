import { ENABLE_CHRISTMAS_THEME, HOLIDAY_CONFIG } from "../../config/holidayConfig";
import ChristmasLights from "./ChristmasLights";
import SnowfallEffect from "./SnowfallEffect";
import PeekingSanta from "./PeekingSanta";

const ChristmasTheme = () => {
  // If master toggle is disabled, zero elements or listeners are mounted
  if (!ENABLE_CHRISTMAS_THEME) {
    return null;
  }

  return (
    <>
      {HOLIDAY_CONFIG.fairyLights && <ChristmasLights />}
      {HOLIDAY_CONFIG.snowfall && <SnowfallEffect />}
      {HOLIDAY_CONFIG.peekingSanta && <PeekingSanta />}
    </>
  );
};

export default ChristmasTheme;
