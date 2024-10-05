import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean; // Return type changed
  logout: () => void;
  setAuthentication: (auth: boolean) => void; // Optional: for future use
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('auth'), // Initialize based on local storage
  login: (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('auth', 'true'); // Set auth in local storage
      set({ isAuthenticated: true }); // Update state
      console.log('Login successful');
      return true; // Return true on successful login
    } else {
      console.log('Invalid credentials');
      return false; // Return false on failed login
    }
  },
  logout: () => {
    localStorage.removeItem('auth'); // Remove auth from local storage
    set({ isAuthenticated: false }); // Update state
  },
  // Optional: method to set authentication status
  setAuthentication: (auth: boolean) => set({ isAuthenticated: auth }),
}));
