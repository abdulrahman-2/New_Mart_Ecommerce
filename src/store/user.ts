import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axios";
import { IRegisterFormValues, IUserStore } from "@/types";

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      loading: false,
      error: null,
      setUser: (user) => set({ user }),

      createUser: async (data: IRegisterFormValues) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/api/auth/signup", data);
          const { success, message } = response.data;
          set({ loading: false });
          return { success, message };
        } catch (error: any) {
          set({
            loading: false,
            error: error.response?.data?.message || error.message,
          });
          return {
            success: false,
            message: error.response?.data?.message || error.message,
          };
        }
      },

      loginUser: async (data: IRegisterFormValues) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/api/auth/login", data);
          const { success, message, user } = response.data;
          set({ isLoggedIn: success, user, loading: false });
          return { success, message };
        } catch (error: any) {
          set({
            isLoggedIn: false,
            loading: false,
            error: error.response?.data?.message || error.message,
          });
          return {
            success: false,
            message: error.response?.data?.message || error.message,
          };
        }
      },

      logoutUser: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/api/auth/logout");
          const { success, message } = response.data;
          set({ isLoggedIn: false, user: null, loading: false });
          return { success, message };
        } catch (error: any) {
          set({
            loading: false,
            error: error.response?.data?.message || error.message,
          });
          return {
            success: false,
            message: error.response?.data?.message || error.message,
          };
        }
      },

      getUser: async () => {
        set({ loading: true, error: null });

        const { isLoggedIn } = get();

        if (!isLoggedIn) {
          set({ loading: false });
          return;
        }

        try {
          const response = await axiosInstance.get("/api/auth/me");
          const user = response.data;
          set({ user, loading: false });
        } catch (error: any) {
          set({ loading: false });
          console.log(error);
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);
