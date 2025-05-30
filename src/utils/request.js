import axios from "axios";

function getBaseURL() {
  const serverIp = window.RUNTIME_CONFIG?.SERVER_IP || "127.0.0.1";
  const serverPort = window.RUNTIME_CONFIG?.SERVER_PORT || "5050";
  return `http://${serverIp}:${serverPort}`;
}

function getRequest() {
  const baseURL = getBaseURL();
  console.log("RUNTIME_CONFIG: ", window.RUNTIME_CONFIG);
  console.log("Base URL for API requests:", baseURL);
  return axios.create({
    baseURL,
    timeout: 10000,
  });
}

export default getRequest;
