
import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;            
  isAuthenticated: boolean;       
  setUser: (user: User) => void;  
  clearUser: () => void;          
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  // Встановлюємо користувача та змінюємо статус на авторизований
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  // Очищуємо користувача та змінюємо статус на неавторизований
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));