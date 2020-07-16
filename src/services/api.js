import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.27:3336/",
});

export default api;
