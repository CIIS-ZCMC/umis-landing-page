import { ACTIVE_THEME } from "../../config/holidayConfig";
import ChristmasTheme from "../Christmas/ChristmasTheme";
import HalloweenTheme from "../Halloween/HalloweenTheme";

/**
 * SeasonalTheme
 *
 * Master switcher that mounts the appropriate seasonal decorations based on ACTIVE_THEME:
 * - 'halloween': Drifting bats, spiderwebs, swinging spiders, peeking pumpkin
 * - 'christmas': Snowfall, twinkling fairy lights, peeking Santa
 * - 'none' or any other: Completely inactive, zero DOM elements mounted
 */
const SeasonalTheme = () => {
  if (ACTIVE_THEME === "halloween") {
    return <HalloweenTheme />;
  }

  if (ACTIVE_THEME === "christmas") {
    return <ChristmasTheme />;
  }

  return null;
};

export default SeasonalTheme;
