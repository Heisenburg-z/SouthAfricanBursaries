
import { useAuth } from '../pages/contexts/AuthContext';
// components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Search, Bell, User, LogOut } from 'lucide-react';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Student Portal
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Professional Career Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#bursaries" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Bursaries
            </Link>
            <Link to="/#internships" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Internships
            </Link>
            <Link to="/#programs" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Graduate Programs
            </Link>
            <Link to="/#about" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              About
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search and Notifications - only show when logged in */}
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 hover:bg-white transition-colors duration-200"
                  />
                </div>
                <button className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200 hover:bg-slate-100 rounded-lg">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                </button>
              </div>
            )}

            {/* User authentication section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={user.isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <User className="h-4 w-4 text-slate-700" />
                  <span className="text-sm font-medium text-slate-800">
                    {user.firstName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              {/* Search bar for mobile */}
              {user && (
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
                  />
                </div>
              )}

              {/* Navigation links */}
              <Link to="/#bursaries" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                Bursaries
              </Link>
              <Link to="/#internships" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                Internships
              </Link>
              <Link to="/#programs" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                Graduate Programs
              </Link>
              <Link to="/#about" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              {/* User section for mobile */}
              {user ? (
                <>
                  <Link
                    to={user.isAdmin ? "/admin" : "/dashboard"}
                    className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>My Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;