import React from 'react';

const NavButton = ({ section, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(section)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-white/10 text-white shadow-lg'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={20} />
    <span className="hidden md:block">{label}</span>
  </button>
);

export default NavButton;