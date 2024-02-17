import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [signupLinkColor, setSignupLinkColor] = useState(''); // สีของลิงก์ "Signup"
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', credentials);
      console.log(response.data);
      login(response.data.access_token);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง');
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('signupLinkColor');
    if (savedColor) {
      setSignupLinkColor(savedColor);
    }
  }, []);

  const handleSignupClick = () => {
    setSignupLinkColor('blue');
    localStorage.setItem('signupLinkColor', 'blue');
  };

  useEffect(() => {
    return () => {
      setSignupLinkColor('');
      localStorage.removeItem('signupLinkColor');
    };
  }, []);

  const handleClose = () => {
    navigate('/');
  };
  return (
    <div className='from'>
      <form onSubmit={handleSubmit} style={{ display: 'flex', width: '70vh', justifyContent: 'center', alignItems: 'center' }}>

        <div className='Login' style={{ backgroundColor: '#C2A891', flex: 1 }}>
        <button onClick={handleClose} className='close' style={{ alignSelf: 'flex-end' }}></button>
          <h2 className='logintext' style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '32px', textAlign: 'center' }}>Login</h2>
          <div className='usernameOremail'>
            <label style={{ fontStyle: 'italic' }}>Username or email   </label>
            <input type="username" name="usernameOrEmail" value={credentials.usernameOrEmail} onChange={handleChange} />
          </div>
          <div className='password'>
            <label style={{ fontStyle: 'italic' }}>Password   </label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <div className='Submit'>
            <button type="submit" style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: ' 15px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} >Login</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <div className='signuplink'>
            <p style={{ display: 'inline' }}>No account? </p>
            <Link to="/signup" className='Signuppages' onClick={handleSignupClick} style={{ color: signupLinkColor }}>Signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
};





export default Login;