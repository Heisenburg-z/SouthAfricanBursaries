// components/ProtectedRoute.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;