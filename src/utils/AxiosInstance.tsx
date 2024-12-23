import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://safia.runasp.net/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
