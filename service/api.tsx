import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "http://10.0.2.2:5000/api/",
  
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
});

export default api;
