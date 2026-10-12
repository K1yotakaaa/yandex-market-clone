import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
};

type Credential = {
  password: string;
  user: User;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  credentials: Record<string, Credential>;
  register: (username: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const uid = () => 'u_' + Math.random().toString(36).slice(2, 10);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      credentials: {},

      register: (username, email, password) => {
        const u = username.trim();
        if (u.length < 3) return { ok: false, error: 'Username must be at least 3 characters' };
        if (!/^[a-zA-Z0-9_]+$/.test(u)) return { ok: false, error: 'Only letters, numbers and underscore' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Invalid email address' };
        if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters' };
        if (!/[A-Z]/.test(password)) return { ok: false, error: 'Password must contain an uppercase letter' };
        if (!/[a-z]/.test(password)) return { ok: false, error: 'Password must contain a lowercase letter' };
        if (!/\d/.test(password)) return { ok: false, error: 'Password must contain a number' };
        if (!/[^a-zA-Z0-9]/.test(password)) return { ok: false, error: 'Password must contain a special character' };
        if (get().credentials[u]) return { ok: false, error: 'Username already taken' };

        const user: User = {
          id: uid(),
          username: u,
          email: email.trim(),
          createdAt: new Date().toISOString(),
        };

        set((s) => ({
          credentials: { ...s.credentials, [u]: { password, user } },
          user,
          isAuthenticated: true,
        }));
        return { ok: true };
      },

      login: (username, password) => {
        const u = username.trim();
        const cred = get().credentials[u];
        if (!cred) return { ok: false, error: 'User not found' };
        if (cred.password !== password) return { ok: false, error: 'Invalid password' };
        set({ user: cred.user, isAuthenticated: true });
        return { ok: true };
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'marketplace-auth' },
  ),
);