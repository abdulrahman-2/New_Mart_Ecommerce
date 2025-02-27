import { ICartStore } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<ICartStore>()(
  persist(
    (set) => ({
      cart: [],
      loading: false,
      error: null,

      setCart: (cart) => set({ cart }),

      addToCart: (product) => {
        set((state) => {
          const cartItem = state.cart.find((item) => item._id === product._id);

          if (cartItem) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const product = state.cart.find((item) => item._id === id);
          if (!product) return state;

          return {
            cart: state.cart.filter((item) => item._id !== id),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      incrementQuantity: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        }));
      },

      decrementQuantity: (id) => {
        set((state) => {
          const product = state.cart.find((item) => item._id === id);
          if (!product) return state;

          if (product.quantity === 1) {
            return {
              cart: state.cart.filter((item) => item._id !== id),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item._id === id
                ? { ...item, quantity: (item.quantity || 1) - 1 }
                : item
            ),
          };
        });
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);
