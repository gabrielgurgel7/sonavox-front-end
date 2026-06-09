import axios from "axios";

export class AxiosConfig {
  private $instance;

  // Configuração da baseURL:
  constructor(public baseURL: string = "/api") {
    this.$instance = axios.create({
      baseURL: this.baseURL,
    });
  }

  // Configuração dos interceptadores:
  setConfig() {
    // Interceptador para request:
    this.$instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
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
