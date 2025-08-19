export class Game {
  constructor(id, name, description, difficulty, icon, color, players = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
    this.icon = icon;
    this.color = color;
    this.players = players;
    this.isActive = true;
  }

  getDifficultyColor() {
    const colors = {
      'Beginner': 'text-green-400',
      'Intermediate': 'text-yellow-400',
      'Advanced': 'text-red-400',
      'Expert': 'text-purple-400'
    };
    return colors[this.difficulty] || 'text-gray-400';
  }

  getPlayerCount() {
    return `${this.players} active bots`;
  }
}