import axios from "axios";
import { toast } from "@/components/ui/toast";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hadToken = !!localStorage.getItem("auth_token");
      localStorage.removeItem("auth_token");
      if (hadToken) {
        window.dispatchEvent(new Event("auth:unauthorized"));
        toast.add({
          type: "error",
          title: "Sesion Expirada",
          description: "Vuelve a iniciar sesion para continuar.",
        });
      }
    }
    return Promise.reject(error);
  },
);
