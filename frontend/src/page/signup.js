import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [user, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user', user);
            console.log('User created:', response.data);
            navigate('/home');
            // เพิ่มการประมวลผลเพิ่มเติมหรืออัปเดตสถานะของแอปพลิเคชัน React ตามต้องการ
        } catch (error) {
            console.error('Error creating user:', error.response.data.message);
        }
    };
    const handleClose = () => {
        navigate('/');
        console.log('Close button clicked');
    };
    return (
        <div className='from'>
            <form onSubmit={handleSubmit}>
                <div className='Signup' style={{ backgroundColor: '#C2A891', flex: 1 }}>
                    <button onClick={handleClose} className='close' style={{ alignSelf: 'flex-end' }}></button>
                    <h2 className='signuptext' style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '32px', textAlign: 'center' }}>Signup</h2>

                    <div className='Fname'>
                        <label style={{ fontStyle: 'italic' }}> Fristname </label>
                        <input type="Fname" name="fname" value={user.fname} onChange={handleChange} placeholder="fristname" required />
                    </div>
                    <div className='Lname'>
                        <label style={{ fontStyle: 'italic' }}> Lastname </label>
                        <input type="Lname" name="lname" value={user.lname} onChange={handleChange} placeholder="lastname" required />
                    </div>
                    <div className='username'>
                        <label style={{ fontStyle: 'italic' }}> Username </label>
                        <input type="username" name="username" value={user.username} onChange={handleChange} placeholder="username" required />
                    </div>
                    <div className='passwords'>
                        <label style={{ fontStyle: 'italic' }}> Password </label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" required />
                    </div>
                    <div className='email'>
                        <label style={{ fontStyle: 'italic' }}> Email </label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="email" required />
                    </div>
                    <div className='phone'>
                        <label style={{ fontStyle: 'italic' }}> Phone </label>
                        <input type="phone" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
                    </div>
                    <div className='address'>
                        <label style={{ fontStyle: 'italic' }}> Address </label>
                        <input type="address" name="address" value={user.address} onChange={handleChange} placeholder="address" required />
                    </div>
                    <div className='Createsubmit'>
                        <button type="Createsubmit" style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: ' 15px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Create User</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
export default Signup;