import axios from "axios";
import { decryptApiResponse } from "../utils/PayloadSecurity";

export const ENV = "staging";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  development: "http://192.168.36.49:8004/api/",
  local: "http://localhost:81/api/",
};

const baseURL = import.meta.env.VITE_API_URL || BASE_URL.development;

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

export { umis };
