import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dmsp.vercel.app/api",
});
