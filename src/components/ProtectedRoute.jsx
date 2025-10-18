// components/ProtectedRoute.jsx
import { useAuth } from '../components/pages/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;