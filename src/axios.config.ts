import axios, { AxiosInstance } from "axios";

const BaseURL = "https://backend.com/";

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
    const token = sessionStorage.getItem("token"); // Obtenemos el token de la sesión
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añadimos el token en la cabecera
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
