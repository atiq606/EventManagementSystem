import React from 'react';

const Navbar = ({ onNavClick }) => {
  return (
    <nav>
      <div className="nav-logo">
        <span>EventOS</span>
        <span className="dot"></span>
      </div>
      <div className="nav-links">
        <a href="#" onClick={() => onNavClick('home')} className="nav-link active">Home</a>
        <a href="#" onClick={() => onNavClick('events')} className="nav-link">Events</a>
        <a href="#" onClick={() => onNavClick('login')} className="nav-cta">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
