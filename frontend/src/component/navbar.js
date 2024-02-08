import React, { useState, useEffect } from 'react';
import './navbar.css'
//import axios from 'axios';  
import { Link } from 'react-router-dom';

function Navbar() {
  const [signupLinkColor, setSignupLinkColor] = useState(''); // สีของลิงก์ "Signup"

  // เมื่อคอมโพเนนต์ถูกโหลด ตรวจสอบสีของลิงก์ "Signup" ที่ถูกบันทึกไว้ใน localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('signupLinkColor');
    if (savedColor) {
      setSignupLinkColor(savedColor);
    }
  }, []);

  // ฟังก์ชันที่เรียกเมื่อคลิกที่ลิงก์ "Signup"
  const handleSignupClick = () => {
    // เปลี่ยนสีของลิงก์เป็นสีแดง
    setSignupLinkColor('red');

    // บันทึกสีที่ถูกเปลี่ยนไว้ใน localStorage
    localStorage.setItem('signupLinkColor', 'red');
  };

  // เมื่อคอมโพเนนต์ถูกทำลาย (unmount) กลับไปสีเดิม
  useEffect(() => {
    return () => {
      setSignupLinkColor(''); // กลับไปสีเดิม
      localStorage.removeItem('signupLinkColor'); // ลบสีที่ถูกเก็บไว้ใน localStorage
    };
  }, []);
  return (
        <nav className="navbar">
            <div className='home-text' style={{ fontWeight: 'bold',fontStyle: 'italic',fontSize: '24px' }}>Talk about me</div>
            <input type='text'></input>
            <div>
            <Link to="/login" className='Loginpage'>Login</Link>
            <Link to="/signup" className='Signuppage' onClick={handleSignupClick} style={{ color: signupLinkColor }}>Signup</Link>
            </div>
        </nav>
  );
};

export default Navbar;