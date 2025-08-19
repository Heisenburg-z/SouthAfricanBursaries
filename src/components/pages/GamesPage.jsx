import React from 'react';
import GameCard from '../common/games/GameCard.jsx';
import { games } from '../../data/mockData.jsx';

const GamesPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Battle Arenas</h2>
        <p className="text-gray-400">Choose your battlefield and deploy your AI</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;