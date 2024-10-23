import axios from "axios";

let baseURL = "http://localhost:8000/api/";

const umis = new axios.create({
  baseURL: baseURL,
  withCredentials: true,
  crossDomain: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export { umis };
