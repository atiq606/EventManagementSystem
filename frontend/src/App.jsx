import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import RegistrationModal from './components/RegistrationModal';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <div id="progress"></div>
      <div id="cursor"></div>
      <div id="cursor-trail"></div>
      <div className="grid-bg"></div>
      
      <Navbar onNavClick={handleNavClick} />
      
      {currentPage === 'home' && <Home onOpenRegister={handleRegister} />}
      {currentPage === 'login' && <Login onPageChange={handleNavClick} />}
      
      <RegistrationModal 
        event={selectedEvent} 
        isOpen={showRegistration} 
        onClose={handleCloseRegistration} 
      />
    </div>
  );
}

export default App;
