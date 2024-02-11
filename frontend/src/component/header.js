import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (linkName) => {
      setActiveLink(linkName);
    };  
  return (
    <div className='header-icon' style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/home" className={activeLink === 'home' ? 'Homepage' : 'header-link'} style={{ margin: '0.5rem 0.9rem',fontSize:'20px' }} onClick={() => handleLinkClick('home')}> Home </Link>
        <Link to="/feed" className={activeLink === 'feed' ? 'Feedpage' : 'header-link'} style={{ margin: '0.5rem 0.9rem',fontSize:'20px' }} onClick={() => handleLinkClick('feed')}> Feed </Link>
        <Link to="/notification" className={activeLink === 'notification' ? 'Notificationpage' : 'header-link'} style={{ margin: '0.5rem 0.9rem',fontSize:'20px' }} onClick={() => handleLinkClick('notification')}> Notification </Link>
    </div>
  )
}
