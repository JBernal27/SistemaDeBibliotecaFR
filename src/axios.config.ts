import axios, { AxiosInstance } from "axios";
import AuthStorage from "./components/utilities/auth-storage.utility";

const BaseURL = "http://localhost:8000/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BaseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };