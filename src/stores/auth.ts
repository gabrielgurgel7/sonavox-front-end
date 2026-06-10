import { defineStore } from "pinia";
import { User } from "@/models/user.model";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : new User(),
      accessToken: localStorage.getItem("accessToken") as null | string,
      refreshToken: localStorage.getItem("refreshToken") as null | string,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getEmail(state) {
      return state.user?.email ?? "No email";
    },
    getRole(state): "ADMIN" | "CUSTOMER" | null {
      return state.user?.role ?? null;
    },
    isAuth(state): boolean {
      return !!state.accessToken;
    },
  },
  actions: {
    setUser(user: User) {
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    },
    setAccessToken(token: string) {
      localStorage.setItem("accessToken", token);
      this.accessToken = token;
    },
    setRefreshToken(token: string) {
      localStorage.setItem("refreshToken", token);
      this.refreshToken = token;
    },
    logout() {
      this.user = new User();
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});
