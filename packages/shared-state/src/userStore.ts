import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  orders: Order[];
  setAvatar: (dataUrl: string | null) => void;
  toggleFavorite: (oskuId: string) => void;
  isFavorite: (oskuId: string) => boolean;
  clearUserData: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      avatar: null,
      favorites: [],
      orders: [],

      setAvatar: (dataUrl) => set({ avatar: dataUrl }),

      toggleFavorite: (oskuId) =>
        set((s) => ({
          favorites: s.favorites.includes(oskuId)
            ? s.favorites.filter((id) => id !== oskuId)
            : [...s.favorites, oskuId],
        })),

      isFavorite: (oskuId) => get().favorites.includes(oskuId),

      clearUserData: () => set({ avatar: null, favorites: [], orders: [] }),
    }),
    { name: 'marketplace-user' },
  ),
);