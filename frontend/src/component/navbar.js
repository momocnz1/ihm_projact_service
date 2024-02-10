import React from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Navbar() {
  const { loggedInUsername } = useAuth();

  return (
    <nav className="navbar">
      <div className='home-text' style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px' }}>Talk about me</div>
      <input type='text'></input>
      <div>
      {loggedInUsername ? (           

          <Link to="/home" className='Loginpage'>{loggedInUsername}</Link>
        ) : (
          <Link to="/login" className='Loginpage'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  