import { Crown, Medal, Star } from 'lucide-react';

export class Developer {
  constructor(id, name, score, rank, avatar, wins = 0, games = 0) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.rank = rank;
    this.avatar = avatar;
    this.wins = wins;
    this.games = games;
  }

  getWinRate() {
    if (this.games === 0) return 0;
    return Math.round((this.wins / this.games) * 100);
  }

  getRankBadge() {
    if (this.rank === 1) return { icon: Crown, color: 'text-yellow-400' };
    if (this.rank === 2) return { icon: Medal, color: 'text-gray-300' };
    if (this.rank === 3) return { icon: Medal, color: 'text-orange-400' };
    return { icon: Star, color: 'text-blue-400' };
  }
}