
Footer.jsx
// components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-emerald-600 p-2 rounded-lg shadow-lg transition-all duration-300 group-hover:bg-emerald-500 group-hover:scale-110 group-hover:rotate-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                  Student Portal
                </h2>
                <p className="text-xs text-slate-400">Professional Career Hub</p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering students to find bursaries, internships, and graduate programs for a successful career.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/#bursaries" 
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm"
                >
                  Bursaries
                </Link>
              </li>
              <li>
                <Link 
                  to="/#internships" 
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link 
                  to="/#programs" 
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm"
                >
                  Graduate Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/#about" 
                  className="text-slate-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@studentportal.com" 
                  className="flex items-center space-x-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group text-sm"
                >
                  <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">info@studentportal.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+27123456789" 
                  className="flex items-center space-x-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group text-sm"
                >
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">+27 12 345 6789</span>
                </a>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-slate-400 group text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="group-hover:text-emerald-400 transition-colors duration-300">
                    Johannesburg, South Africa
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-500">
              © {currentYear} Student Portal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;