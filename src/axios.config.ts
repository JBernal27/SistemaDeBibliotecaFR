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

// Response interceptor: detect 401, clear auth and redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const status = error?.response?.status;
      if (status === 401) {
        // If user seems logged (token or user data exists) then clear and redirect
        const token = AuthStorage.getToken();
        const user = AuthStorage.getUser();
        if (token || user) {
          AuthStorage.logout();
          // dispatch auth change so UI can update
          window.dispatchEvent(new Event("authChange"));

          // avoid redirect loop if already on auth route
          const currentPath = window.location.pathname;
          if (!currentPath.startsWith("/auth")) {
            window.location.href = "/auth";
          }
        }
      }
    } catch {
      // ignore interceptor errors
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };