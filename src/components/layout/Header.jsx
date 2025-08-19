import React, { useState } from 'react';
import { GraduationCap, Menu, X, Search, Bell } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Portal
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Find Your Future</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#bursaries" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Bursaries
            </a>
            <a href="#internships" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Internships
            </a>
            <a href="#programs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Graduate Programs
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Search and Notifications */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <a href="#bursaries" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Bursaries
              </a>
              <a href="#internships" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Internships
              </a>
              <a href="#programs" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Graduate Programs
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                About
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;