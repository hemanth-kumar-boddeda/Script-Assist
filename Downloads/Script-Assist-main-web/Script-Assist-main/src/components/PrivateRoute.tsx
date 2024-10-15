import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
