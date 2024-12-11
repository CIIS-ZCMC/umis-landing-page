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
  },
  development: {
    umis: "http://localhost:5173",
    prm: "http://localhost:5174",
  },
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
