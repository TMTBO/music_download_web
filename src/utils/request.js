import axios from "axios";

console.log(`Environment Variables ${JSON.stringify(process.env)}`);

const serverIp = process.env.VUE_APP_SERVER_IP;
const serverPort = process.env.VUE_APP_SERVER_PORT;

const baseURL = `http://${serverIp}:${serverPort}`;

const request = axios.create({
  baseURL,
  timeout: 10000,
});

export default request;
