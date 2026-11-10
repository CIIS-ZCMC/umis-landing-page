/**
 * ============================================================================
 * 🎃 / 🎄 / 💀 Seasonal & Holiday Theme Configuration
 * ============================================================================
 *
 * Switch the active theme with a single setting:
 *   - 'nightmare' : 💀 The Nightmare Before Christmas (Jack Skellington, gothic snowflakes & bats, Sandy Claws hat, pinstripes)
 *   - 'halloween' : 🎃 Spooky Halloween theme (Bats, Pumpkin, Spiderwebs, Witch Hat)
 *   - 'christmas' : 🎄 Festive Christmas theme (Snow, Lights, Santa, Santa Hat)
 *   - 'none'      : Standard default landing page (no seasonal overlays)
 */
export const ACTIVE_THEME = "christmas"; // Options: 'nightmare' | 'halloween' | 'christmas' | 'none'

// Backward compatibility & theme active helpers
export const ENABLE_NIGHTMARE_THEME = ACTIVE_THEME === "nightmare";
export const ENABLE_CHRISTMAS_THEME = ACTIVE_THEME === "christmas";
export const ENABLE_HALLOWEEN_THEME = ACTIVE_THEME === "halloween";

/**
 * 💀 Nightmare Before Christmas Theme Fine-Grained Controls
 */
export const NIGHTMARE_CONFIG = {
  // Gothic snowfall mixed with fluttering bat silhouettes and eerie moonlight motes
  spookySnowAndBats: true,

  // Tim Burton style twisted garland with eerie multi-color bulbs across header
  gothicGarland: true,

  // Peeking Jack Skellington in Sandy Claws hat with "What's this?!" speech bubble
  peekingJack: true,

  // Jack's bat-bowtie & Santa hat perched on the ZCMC logo
  jackOnLogo: true,

  // Spooky gothic header badge ("💀 What's This?! 🎄")
  nightmareBadge: true,
};

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
  filipinoParol: true, // 🌟 Authentic Filipino Capiz Star Lantern (Parol)
};
