import React from 'react';
import './styles/Navbar.css';

const NavBar = ({ onHelpClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button className="help-button" onClick={onHelpClick}>
          <span className="question-mark">?</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;