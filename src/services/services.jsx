import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  development: "http://localhost:8000/api/",
};

const umis = new axios.create({
  baseURL: BASE_URL.production,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis };
