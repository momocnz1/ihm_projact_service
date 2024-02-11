import React from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Navbar() {
  const { loggedInUsername,logout } = useAuth();

  const handleLogout = () => {
    logout(); // เรียกใช้งานฟังก์ชัน logout จาก context
  };

  return (
    <nav className="navbar">
      <div className='home-text' style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '24px' }}>Talk about me</div>
      <input type='text'></input>
      <div>
        {loggedInUsername ? (
          <div className='dropdown'>
          <Link to="/home" className='Loginpage'>{loggedInUsername}</Link>
          <div className='dropdn'> 
            <Link to="/profile" className='profile'>Profile</Link>
            <Link to="/home" onClick={handleLogout} className="logoutButton">Logout</Link>
          </div>          
          </div>
          ) : (
          <Link to="/login" className='Loginpage'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  