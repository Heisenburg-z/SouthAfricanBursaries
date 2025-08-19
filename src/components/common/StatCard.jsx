import React from 'react';

const StatCard = ({ stat }) => {
  const IconComponent = stat.icon;
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-lg bg-black/30 ${stat.color}`}>
          <IconComponent size={24} />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;