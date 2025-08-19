import React from 'react';
import { ChevronRight } from 'lucide-react';

const GameCard = ({ game }) => {
  const IconComponent = game.icon;
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-black/30 ${game.color}`}>
          <IconComponent size={24} />
        </div>
        <span className={`text-sm font-medium ${game.getDifficultyColor()}`}>
          {game.difficulty}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
      <p className="text-gray-400 mb-4">{game.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{game.getPlayerCount()}</span>
        <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
          <span className="text-sm font-medium">Join Battle</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default GameCard;