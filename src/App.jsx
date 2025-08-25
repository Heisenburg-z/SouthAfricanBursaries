import './index.css'
import React from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './components/pages/HomePage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HomePage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
