// components/pages/components/ProtectedRoute.jsx
import { useAuth } from '../contexts/AuthContext'; // This is correct!
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  console.log('ProtectedRoute - Loading:', loading);
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - adminOnly:', adminOnly);
  
  if (loading) {
    console.log('ProtectedRoute - Showing loading spinner');
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }
  
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !user.isAdmin) {
    console.log('ProtectedRoute - User not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('ProtectedRoute - Access granted, rendering children');
  return children;
};

export default ProtectedRoute;