import { Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import Landing from './pages/landing/Landing';
import Resources from './pages/resources/Resources';
import ResourceDetail from './pages/resources/ResourceDetail';
import Login from './pages/login/Login';
import { useAuthStore } from './store/app.store'; // Import zustand store

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="*" element={isAuthenticated ? <Landing /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={ <Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
        </Routes>
      </QueryClientProvider>
    </MantineProvider>
  );
}
