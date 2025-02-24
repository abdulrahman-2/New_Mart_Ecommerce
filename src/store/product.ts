import { IProduct, IProductStore } from "@/types";
import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create<IProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct: IProduct) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const { data, message } = await res.json();
      set((state) => ({ products: [...state.products, data], loading: false }));
      return { success: true, message };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const { data } = await res.json();
      set({ products: data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  editProduct: async (id: string, updatedProduct: IProduct) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const { data, message } = await res.json();
      set((state) => ({
        products: state.products.map((product) =>
          product._id === data._id ? data : product
        ),
        loading: false,
      }));
      return { success: true, message };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      const { message } = await res.json();
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      return { success: true, message };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },
}));
