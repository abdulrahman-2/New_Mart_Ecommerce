import { IProduct, IProductStore } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

export const useProductStore = create<IProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct: IProduct) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/api/products", newProduct);
      set((state) => ({
        products: [...state.products, data.data],
        loading: false,
      }));
      return { success: true, message: data.message };
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

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/api/products");
      set({ products: data.data, loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
    }
  },

  editProduct: async (id: string, updatedProduct: IProduct) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.put(
        `/api/products/${id}`,
        updatedProduct
      );
      set((state) => ({
        products: state.products.map((product) =>
          product._id === data.data._id ? data.data : product
        ),
        loading: false,
      }));
      return { success: true, message: data.message };
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

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.delete(`/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      return { success: true, message: data.message };
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
}));
