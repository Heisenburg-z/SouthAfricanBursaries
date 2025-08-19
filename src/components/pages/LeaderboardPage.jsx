import React from 'react';
import DeveloperRow from '../common/games/leaderboard/DeveloperRow.jsx';
import { topDevelopers } from '../../data/mockData.jsx';

const LeaderboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Global Leaderboard</h2>
        <p className="text-gray-400">Top AI developers competing for glory</p>
      </div>
      <div className="space-y-4">
        {topDevelopers.map((developer) => (
          <DeveloperRow key={developer.id} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
// This page displays the global leaderboard with top developers and their stats.