import axios from "axios";

const request = axios.create({
  baseURL: "http://127.0.0.1:80", // 设置基础域名和端口
  timeout: 10000,
});

export default request;
