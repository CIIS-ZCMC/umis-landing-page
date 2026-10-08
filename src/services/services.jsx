import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  development: "http://192.168.11.63:8001/api/",
  local: "http://localhost:8000/api/",
};

const currentHost = typeof window !== "undefined" ? window.location.hostname : "localhost";
const isLocal = currentHost === "localhost" || currentHost === "127.0.0.1";

const PR_BASE_URL = {
  production: "https://prmonitoringapi.zcmc.online/api/v1/",
  development: "http://192.168.11.63:8006/api/v1/",
  local: `http://${currentHost}:8006/api/v1/`,
};

const umis = new axios.create({
  baseURL: BASE_URL.development,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

const prApi = axios.create({
  baseURL: isLocal ? PR_BASE_URL.local : PR_BASE_URL.development,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis, prApi };
