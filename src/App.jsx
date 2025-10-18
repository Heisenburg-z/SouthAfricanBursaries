// App.jsx
import './index.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/pages/contexts/AuthContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';
import AdminPage from './components/pages/AdminPage.jsx';
import StudentDashboard from './components/pages/StudentDashboard.jsx';
import AuthPage from './components/pages/AuthPage.jsx';
import ProtectedRoute from './components/pages/components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;