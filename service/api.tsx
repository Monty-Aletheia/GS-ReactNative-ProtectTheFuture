import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/",
  // baseURL: "http://10.0.2.2:5000/api/",
  baseURL: "http://user-service-aci-52.brazilsouth.azurecontainer.io:8080/api/",
    timeout: 10000,
  
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
});

export default api;
