import React, { useState } from 'react';
import { GraduationCap, Menu, X, Search, Bell } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Student Portal
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Professional Career Hub</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#bursaries" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Bursaries
            </a>
            <a href="#internships" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Internships
            </a>
            <a href="#programs" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              Graduate Programs
            </a>
            <a href="#about" className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Search and Notifications */}
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

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
                />
              </div>
              <a href="#bursaries" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200">
                Bursaries
              </a>
              <a href="#internships" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200">
                Internships
              </a>
              <a href="#programs" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200">
                Graduate Programs
              </a>
              <a href="#about" className="text-slate-700 hover:text-emerald-600 font-medium py-2 transition-colors duration-200">
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