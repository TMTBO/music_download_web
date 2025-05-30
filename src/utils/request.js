import axios from "axios";

const request = axios.create({
  baseURL: "/music",
  timeout: 10000,
});

export default request;
