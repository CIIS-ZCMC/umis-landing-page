import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online",
  development: "http://localhost:8000/api/",
};

const umis = new axios.create({
  baseURL: BASE_URL.development,
  withCredentials: true,
  crossDomain: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    Origin: "http://localhost:3001",
  },
});

export { umis };
