import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export class AxiosConfig {
  private $instance;

  // Configuração da baseURL:
  constructor(public baseURL: string = "/api") {
    this.$instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  // Configuração dos interceptadores:
  setConfig() {
    // Interceptador para request:
    this.$instance.interceptors.request.use((config) => {
      const token = useAuthStore().accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // Interceptador para response:
    this.$instance.interceptors.response.use((res) => {
      return res;
    });
    return this.$instance;
  }
}

export const api = new AxiosConfig().setConfig();
