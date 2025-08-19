import { Users, Brain, Sword, TrendingUp } from 'lucide-react';

export class PlatformStats {
  constructor() {
    this.totalDevelopers = 1247;
    this.activeBots = 892;
    this.totalMatches = 15683;
    this.averageRating = 1450;
  }

  getStats() {
    return [
      { label: 'Developers', value: this.totalDevelopers.toLocaleString(), icon: Users, color: 'text-blue-400' },
      { label: 'Active Bots', value: this.activeBots.toLocaleString(), icon: Brain, color: 'text-green-400' },
      { label: 'Total Matches', value: this.totalMatches.toLocaleString(), icon: Sword, color: 'text-red-400' },
      { label: 'Avg Rating', value: this.averageRating.toLocaleString(), icon: TrendingUp, color: 'text-purple-400' }
    ];
  }
}