import { Game } from '../models/Game.jsx';
import { Developer } from '../models/Developer.jsx';
import { PlatformStats } from '../models/PlatformStats.jsx';
import { Code, Target, Gamepad2, Trophy, Zap } from 'lucide-react';

export const games = [
  new Game(1, 'Chess Engine', 'Classic chess with advanced AI algorithms', 'Expert', Code, 'text-purple-400', 156),
  new Game(2, 'Snake AI', 'Navigate and grow while avoiding collisions', 'Intermediate', Target, 'text-green-400', 89),
  new Game(3, 'Tic-Tac-Toe', 'Perfect your minimax algorithm', 'Beginner', Gamepad2, 'text-blue-400', 234),
  new Game(4, 'Connect Four', 'Strategic depth meets tactical execution', 'Intermediate', Trophy, 'text-yellow-400', 67),
  new Game(5, 'Battleship', 'Probability and pattern recognition', 'Advanced', Zap, 'text-red-400', 43)
];

export const topDevelopers = [
  new Developer(1, 'AlexMind', 2847, 1, '👑', 89, 92),
  new Developer(2, 'CodeNinja', 2734, 2, '🥷', 76, 84),
  new Developer(3, 'BotMaster', 2651, 3, '🤖', 82, 95),
  new Developer(4, 'AIWizard', 2589, 4, '🧙', 71, 78),
  new Developer(5, 'LogicLord', 2523, 5, '⚡', 68, 81)
];

export const platformStats = new PlatformStats();