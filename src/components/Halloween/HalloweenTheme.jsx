import { ENABLE_HALLOWEEN_THEME, HALLOWEEN_CONFIG } from "../../config/holidayConfig";
import SpiderwebHeader from "./SpiderwebHeader";
import DriftingBatsEffect from "./DriftingBatsEffect";
import PeekingPumpkin from "./PeekingPumpkin";

const HalloweenTheme = () => {
  // If master toggle is not 'halloween', nothing mounts
  if (!ENABLE_HALLOWEEN_THEME) {
    return null;
  }

  return (
    <>
      {HALLOWEEN_CONFIG.spiderwebsAndSpiders && <SpiderwebHeader />}
      {HALLOWEEN_CONFIG.driftingBats && <DriftingBatsEffect />}
      {HALLOWEEN_CONFIG.peekingPumpkin && <PeekingPumpkin />}
    </>
  );
};

export default HalloweenTheme;
