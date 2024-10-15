import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('auth'), // Initialize from local storage
  login: (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('auth', 'true'); // Store authentication status
      set({ isAuthenticated: true });
      return true; // Login successful
    } else {
      return false; // Invalid credentials
    }
  },
  logout: () => {
    localStorage.removeItem('auth'); // Clear auth status on logout
    set({ isAuthenticated: false });
  },
}));
