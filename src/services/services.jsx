import axios from "axios";
import { decryptApiResponse } from "../utils/PayloadSecurity";

export const ENV = "staging";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  staging: "https://staging-umis.zcmc.online/api/",
  development: "http://192.168.36.49:8004/api/",
  local: "http://localhost:81/api/",
};

const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";

const PR_BASE_URL = {
  production: "https://prmonitoringapi.zcmc.online/api/v1/",
  staging: "https://sandbox-prapi.zcmc.online/api/v1/",
  development: "http://192.168.11.63:8006/api/v1/",
  local: `http://${currentHost}:8006/api/v1/`,
};

const baseURL = BASE_URL[ENV] || import.meta.env.VITE_API_URL || BASE_URL.development;

const umis = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

umis.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      response.data = decryptApiResponse(response.data);
    }
    return response;
  },
  (error) => {
    if (error && error.response && error.response.data) {
      error.response.data = decryptApiResponse(error.response.data);
    }
    return Promise.reject(error);
  }
);

const prApi = axios.create({
  baseURL: PR_BASE_URL[ENV] || PR_BASE_URL.staging,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis, prApi };