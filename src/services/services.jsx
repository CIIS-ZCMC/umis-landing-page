import axios from "axios";

const BASE_URL = {
  production: "https://umis.zcmc.online/api/",
  development: "http://192.168.36.150:81/api/",
  local: "http://192.168.36.150:81/api/",
};

const umis = new axios.create({
  baseURL: BASE_URL.development,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis };
