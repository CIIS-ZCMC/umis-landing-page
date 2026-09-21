/**
 * Configuration
 *
 * global configuration for configuration setting for development and production to prevent
 * reassigning of target url
 */

export const config = {
  production: {
    umis: "https://portal.zcmc.online",
    prm: "https://prm.zcmc.online",
    po_dashboard: "https://mms.zcmc.online",
  },
  development: {
    umis: "http://localhost:5173",
    prm: "http://localhost:5174",
    po_dashboard: "http://localhost:5175",
  },
};

/**
 * Get PO Dashboard URL
 *
 * @param {object} user : Current logged-in user object
 * @returns {string} Target PO Dashboard URL
 */
export const getPoDashboardUrl = (user) => {
  if (user?.side_bar_details?.system) {
    const sys = user.side_bar_details.system.find(
      (s) => s.code === "PO"
    );
    if (sys?.url) return sys.url;
  }
  const isProd =
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1";
  if (isProd) return config.production.po_dashboard;
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "localhost";
  return `http://${hostname}:5175`;
};


/**
 * Get system URL via system code
 *
 * @param {array} systems : List of user system access
 * @param {string} targetCode : System code of the target system
 * @returns
 */
export const getSystemUrlByCode = (systems, targetCode) => {
  const system = systems.find((system) => system.code === targetCode);
  return system ? system.url : null;
};

/**
 * Get system URL via system code
 *
 * @param {array} systems : List of user system access
 * @param {string} targetCode : System code of the target system
 * @returns
 */
export const getRedcapFormsUrlByCode = (forms, targetCode) => {
  const system = forms.find((form) => form.code === targetCode);
  return system ? system.link : null;
};
