import axios from "axios";

export const ENV = "staging";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  staging: "https://staging-umis.zcmc.online/api/",
  development: "http://192.168.36.150:81/api/",
  local: "http://192.168.36.150:81/api/",
};

const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";

const PR_BASE_URL = {
  production: "https://prmonitoringapi.zcmc.online/api/v1/",
  staging: "https://staging-prmonitoringapi.zcmc.online/api/v1/",
  development: "http://192.168.11.63:8006/api/v1/",
  local: `http://${currentHost}:8006/api/v1/`,
};

const umis = new axios.create({
  baseURL: BASE_URL[ENV],
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

const prApi = axios.create({
  baseURL: PR_BASE_URL[ENV] || PR_BASE_URL.staging,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis, prApi };
