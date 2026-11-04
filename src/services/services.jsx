import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  development: "http://192.168.36.150:81/api/",
  local: "http://localhost:81/api/",
};

const isProd =
  typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1";

const getBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (isProd) {
    return BASE_URL.production;
  }
  return BASE_URL.local;
};

const umis = new axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis };
