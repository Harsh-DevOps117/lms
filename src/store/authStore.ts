import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  roleId: number | null;
  userId: number | null;
  setAuth: (token: string, roleId: number, userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      roleId: null,
      userId: null,
      setAuth: (token, roleId, userId) => set({ token, roleId, userId }),
      logout: () => set({ token: null, roleId: null, userId: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
