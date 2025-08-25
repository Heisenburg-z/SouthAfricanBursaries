import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  Heart,
  Shield,
  FileText,
  HelpCircle
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    opportunities: [
      { name: 'Bursaries & Scholarships', href: '#bursaries' },
      { name: 'Internships', href: '#internships' },
      { name: 'Graduate Programs', href: '#programs' },
      { name: 'Learnerships', href: '#learnerships' },
      { name: 'Vacation Work', href: '#vacation-work' }
    ],
    resources: [
      { name: 'Application Tips', href: '#tips' },
      { name: 'CV Builder', href: '#cv-builder' },
      { name: 'Interview Guide', href: '#interview-guide' },
      { name: 'Career Advice', href: '#career-advice' },
      { name: 'Success Stories', href: '#success-stories' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '#careers' },
      { name: 'Partner With Us', href: '#partner' },
      { name: 'Blog', href: '#blog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy', icon: Shield },
      { name: 'Terms of Service', href: '#terms', icon: FileText },
      { name: 'Cookie Policy', href: '#cookies', icon: FileText },
      { name: 'FAQ', href: '#faq', icon: HelpCircle }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin', color: 'hover:text-blue-600' }
  ];

  const stats = [
    { label: 'Active Students', value: '50K+' },
    { label: 'Opportunities Posted', value: '15K+' },
    { label: 'Partner Companies', value: '500+' },
    { label: 'Success Rate', value: '89%' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-emerald-600 p-3 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Student Portal
                </h3>
                <p className="text-sm text-slate-400">Professional Career Hub</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Connecting South African students with verified career opportunities from leading companies. 
              Professional growth starts here.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span>students.opportunities.za@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span>+27 735632209</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span>Johannesburg, South Africa</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 bg-slate-800 rounded-lg ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700 border border-slate-700`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Opportunities */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-emerald-400">Opportunities</h4>
              <ul className="space-y-3">
                {footerLinks.opportunities.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-slate-400">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-amber-400">Company</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h5 className="text-sm font-semibold mb-4 text-orange-400">Legal</h5>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <link.icon className="h-3 w-3 mr-2" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2">Stay Connected</h4>
              <p className="text-slate-300 mb-4">Get the latest opportunities delivered to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400">
              <span>© {currentYear} Student Portal. Made with</span>
              <Heart className="h-4 w-4 text-emerald-500 fill-current" />
              <span>for students in South Africa</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>🇿🇦 Proudly South African</span>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Secure & Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;