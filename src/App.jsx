// App.jsx
import './index.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './components/pages/contexts/AuthContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';
import AdminPage from './components/pages/AdminPage.jsx';
import StudentDashboard from './components/pages/StudentDashboard.jsx';
import AuthPage from './components/pages/AuthPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './components/pages/contexts/AuthContext';

// Create a wrapper component that has access to useNavigate
function AppContent() {
  const navigate = useNavigate();
  const { setNavigate } = useAuth();

  // Set the navigate function in the AuthContext when component mounts
  React.useEffect(() => {
    if (setNavigate) {
      setNavigate(navigate);
    }
  }, [navigate, setNavigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;