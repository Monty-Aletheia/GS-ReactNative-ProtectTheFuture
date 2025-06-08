import axios from "axios";

const apiMarker = axios.create({
  baseURL: "https://mobile-rabbit-api.azurewebsites.net/",
  // baseURL: "",
  timeout: 10000,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiMarker;
