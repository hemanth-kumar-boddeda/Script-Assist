import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Resources from './pages/resources/Resources';
import ResourceDetail from './pages/resources/ResourceDetail';
import PrivateRoute from './components/PrivateRoute';

const routes = [
	{
	  path: '/',
	  element: <App />,
	  children: [
		{ path: '/', element: <Landing /> },
		{ path: '/login', element: <Login /> },
		{
		  path: '/resources',
		  element: <PrivateRoute />,
		  children: [
			{ path: '', element: <Resources /> },
			{ path: ':id', element: <ResourceDetail /> },
		  ],
		},
	  ],
	},
  ];
  

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
