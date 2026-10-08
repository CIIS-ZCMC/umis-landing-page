/**
 * ============================================================================
 * 🎃 / 🎄 Seasonal & Holiday Theme Configuration
 * ============================================================================
 *
 * Switch the active theme with a single setting:
 *   - 'halloween' : Spooky Halloween theme (Bats, Pumpkin, Spiderwebs, Witch Hat)
 *   - 'christmas' : Festive Christmas theme (Snow, Lights, Santa, Santa Hat)
 *   - 'none'      : Standard default landing page (no seasonal overlays)
 */
export const ACTIVE_THEME = "halloween"; // Options: 'halloween' | 'christmas' | 'none'

// Backward compatibility helper
export const ENABLE_CHRISTMAS_THEME = ACTIVE_THEME === "christmas";
export const ENABLE_HALLOWEEN_THEME = ACTIVE_THEME === "halloween";

/**
 * 🎃 Halloween Theme Fine-Grained Controls
 */
export const HALLOWEEN_CONFIG = {
  // Drifting night bats and spooky glowing embers in the background
  driftingBats: true,

  // Spiderwebs and gently swinging spiders draped along the top header
  spiderwebsAndSpiders: true,

  // Cute, glowing Jack-o'-lantern peeking from the bottom corner
  peekingPumpkin: true,

  // Tilted witch hat perched gracefully on the ZCMC logo
  witchHatOnLogo: true,

  // Spooky holiday badge in the header ("🎃 Spooky Season")
  halloweenBadge: true,
};

/**
 * 🎄 Christmas Theme Fine-Grained Controls
 */
export const HOLIDAY_CONFIG = {
  snowfall: true,
  fairyLights: true,
  peekingSanta: true,
  santaHatOnLogo: true,
  holidayBadge: true,
};
