import axios from "axios";

const api = axios.create({
  baseURL: "http://user-service-aci-watchtower.brazilsouth.azurecontainer.io:8080/api/",
  
    timeout: 10000,
  
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
});

export default api;
