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
    this.$instance.interceptors.request.use((config) => {
      const token = useAuthStore().accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.$instance.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401) {
          const authStore = useAuthStore();
          await authStore.refreshAccessToken();
          return this.$instance(error.config);
        }
        return Promise.reject(error);
      },
    );

    return this.$instance;
  }
}

export const api = new AxiosConfig().setConfig();
