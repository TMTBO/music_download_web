import axios from "axios";

const request = axios.create({
  baseURL: "/music",
  timeout: 10000,
});

// request.interceptors.request.use((config) => {
// const protocol = window.location.protocol === "https:" ? "https" : "http";
// const serverIp = window.RUNTIME_CONFIG?.SERVER_IP || "127.0.0.1";
// const serverPort = window.RUNTIME_CONFIG?.SERVER_PORT || "5050";
// config.baseURL = `${protocol}://${serverIp}:${serverPort}`;
//   return config;
// });

export default request;
