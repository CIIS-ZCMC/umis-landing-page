/**
 * ============================================================================
 * 🎄 Christmas & Holiday Theme Configuration
 * ============================================================================
 *
 * To disable the entire Christmas theme after the holidays, simply set:
 *   ENABLE_CHRISTMAS_THEME = false;
 *
 * When set to false, NO Christmas scripts, canvas particles, lights, or elements
 * will be rendered or mounted, instantly reverting to the original standard look.
 */

export const ENABLE_CHRISTMAS_THEME = true;

export const HOLIDAY_CONFIG = {
  // Gentle, smooth 60fps snowfall in the background (zero click obstruction)
  snowfall: true,

  // Twinkling multi-colored Christmas string lights draped along the top header
  fairyLights: true,

  // Cute Santa Claus peeking from the corner with a warm holiday greeting
  peekingSanta: true,

  // Festive Santa hat perched on the ZCMC logo in the navigation bar
  santaHatOnLogo: true,

  // Floating holiday greeting ribbon
  holidayBadge: true,
};
