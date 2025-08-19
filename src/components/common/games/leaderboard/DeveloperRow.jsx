import React from 'react';

const DeveloperRow = ({ developer }) => {
  const { icon: RankIcon, color: rankColor } = developer.getRankBadge();
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <RankIcon size={20} className={rankColor} />
          <span className="text-lg font-bold text-white">#{developer.rank}</span>
        </div>
        <div className="text-2xl">{developer.avatar}</div>
        <div>
          <h4 className="font-semibold text-white">{developer.name}</h4>
          <p className="text-sm text-gray-400">{developer.getWinRate()}% win rate</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-blue-400">{developer.score}</div>
        <div className="text-sm text-gray-500">{developer.games} games</div>
      </div>
    </div>
  );
};

export default DeveloperRow;