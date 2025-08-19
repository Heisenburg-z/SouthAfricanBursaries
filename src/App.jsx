
import './index.css'
import React, { useState } from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';
import GamesPage from './components/pages/GamesPage.jsx';
import LeaderboardPage from './components/pages/LeaderboardPage.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'games':
        return <GamesPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
<main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {renderContent()}
</main>

      <Footer />
    </div>
  );
}

export default App;
