import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/auth/login', credentials);
        console.log(response.data); 
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      }
    };
  
    return (
      <div className='from'>
      <form onSubmit={handleSubmit} style={{ display: 'flex',width:'70vh',justifyContent:'center',alignItems:'center'}}>
        <div className='Login' style={{ backgroundColor: '#C2A891', flex: 1 }}>
          <h2 className='logintext' style={{ fontWeight: 'bold',fontStyle: 'italic',fontSize: '32px',textAlign:'center'}}>Login</h2>
        <div className='usernameOremail'> 
          <label style={{ fontStyle: 'italic'}}>Username or email   </label>
          <input type="username" name="usernameOrEmail" value={credentials.usernameOrEmail} onChange={handleChange} />
        </div>
        <div className='password'>
          <label style={{ fontStyle: 'italic'}}>Password   </label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <div className='Submit'>
        <button type="submit"style={{ fontWeight: 'bold',fontStyle: 'italic',fontSize: ' 15px',textAlign:'center',justifyContent:'center',alignItems:'center'}} >Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        </div>
        <div>
          <p></p>
        </div>
      </form>
      </div>
    );
  };
    
    



export default Login;