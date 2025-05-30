import axios from "axios";

const serverIp = window.RUNTIME_CONFIG?.SERVER_IP || "127.0.0.1";
const serverPort = window.RUNTIME_CONFIG?.SERVER_PORT || "5050";
const baseURL = `http://${serverIp}:${serverPort}`;
console.log("RUNTIME_CONFIG: ", window.RUNTIME_CONFIG);
console.log("Base URL for API requests:", baseURL);

const request = axios.create({
  baseURL,
  timeout: 10000,
});

export default request;
