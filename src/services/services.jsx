import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online",
  development: "http://192.168.5.1:8100/api/",
  local: "http://localhost:8000/api/",
};

const umis = new axios.create({
  baseURL: BASE_URL.local,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis };
