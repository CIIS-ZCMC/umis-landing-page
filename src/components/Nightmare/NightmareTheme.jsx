import { ENABLE_NIGHTMARE_THEME, NIGHTMARE_CONFIG } from "../../config/holidayConfig";
import NightmareGarland from "./NightmareGarland";
import NightmareSpookySnowEffect from "./NightmareSpookySnowEffect";
import PeekingJack from "./PeekingJack";

const NightmareTheme = () => {
  // If master toggle is not 'nightmare', nothing mounts
  if (!ENABLE_NIGHTMARE_THEME) {
    return null;
  }

  return (
    <>
      {NIGHTMARE_CONFIG.gothicGarland && <NightmareGarland />}
      {NIGHTMARE_CONFIG.spookySnowAndBats && <NightmareSpookySnowEffect />}
      {NIGHTMARE_CONFIG.peekingJack && <PeekingJack />}
    </>
  );
};

export default NightmareTheme;
