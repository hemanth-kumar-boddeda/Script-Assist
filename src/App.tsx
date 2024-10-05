// App.tsx
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Resources from './pages/resources/Resources';
import ResourceDetail from './pages/resources/ResourceDetail';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
        </Routes>
      </QueryClientProvider>
    </MantineProvider>
  );
}
