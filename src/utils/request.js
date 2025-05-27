import axios from "axios";

const serverIp = import.meta.env.SERVER_IP || "127.0.0.1";
const serverPort = import.meta.env.SERVER_PORT || "80";
const baseURL = `http://${serverIp}:${serverPort}`;

const request = axios.create({
  baseURL,
  timeout: 10000,
});

export default request;
