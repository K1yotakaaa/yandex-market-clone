import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  oskuId: string;
  qty: number;
  addedAt: string;
};

export type OrderItem = {
  oskuId: string;
  title: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
};

export type UserState = {
  avatar: string | null;
  favorites: string[];
  cart: CartItem[];
  orders: Order[];

  setAvatar: (dataUrl: string | null) => void;

  toggleFavorite: (oskuId: string) => void;
  isFavorite: (oskuId: string) => boolean;

  addToCart: (oskuId: string, qty?: number) => void;
  removeFromCart: (oskuId: string) => void;
  setCartQty: (oskuId: string, qty: number) => void;
  clearCart: () => void;

  addOrder: (order: Order) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      avatar: null,
      favorites: [],
      cart: [],
      orders: [],

      setAvatar: (dataUrl) => set({ avatar: dataUrl }),

      toggleFavorite: (oskuId) =>
        set((s) => ({
          favorites: s.favorites.includes(oskuId)
            ? s.favorites.filter((id) => id !== oskuId)
            : [...s.favorites, oskuId],
        })),

      isFavorite: (oskuId) => get().favorites.includes(oskuId),

      addToCart: (oskuId, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.oskuId === oskuId);
          if (existing) {
            return {
              cart: s.cart.map((i) =>
                i.oskuId === oskuId ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            cart: [
              ...s.cart,
              { oskuId, qty, addedAt: new Date().toISOString() },
            ],
          };
        }),

      removeFromCart: (oskuId) =>
        set((s) => ({ cart: s.cart.filter((i) => i.oskuId !== oskuId) })),

      setCartQty: (oskuId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((i) => i.oskuId !== oskuId)
              : s.cart.map((i) => (i.oskuId === oskuId ? { ...i, qty } : i)),
        })),

      clearCart: () => set({ cart: [] }),

      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),

      clearUserData: () =>
        set({ avatar: null, favorites: [], cart: [], orders: [] }),
    }),
    { name: 'marketplace-user' },
  ),
);