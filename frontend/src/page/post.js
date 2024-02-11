import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './post.css';

export default function Post() {
    const { loggedInUsername } = useAuth();
    const navigate = useNavigate();
    const [post,setNewPost] = useState('');

    const handleClose = () => {
        navigate('/feed');
    };

    const handleSubmit = async () => {
        try {
            const postresult = await axios.post(`http://localhost:8000/post`, {
                content: post
            },{
                headers:{
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            });
            console.log(postresult)
            setNewPost('');
            navigate('/feed')
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="Post" >
                <button onClick={handleClose} className='closes' style={{ alignSelf: 'flex-end' }}></button>
                <div className='account'>
                    {loggedInUsername}
                </div>
                <div>
                <textarea
                        value={post}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="How do you feel today..."
                        // value={postText}
                        // onChange={(e) => setPostText(e.target.value)}
                        className='Howyoufell'
                />                
                
                <div>
                    <button className='imagesplus'>  photo</button>
                </div>
                <button className='creatPs' style={{ 
                    fontWeight: 'bold', 
                    fontStyle: 'italic', 
                    fontSize: ' 15px', 
                    textAlign: 'center', 
                    justifyContent: 'center', 
                    alignItems: 'center' }} onClick={handleSubmit} >creat post</button>
            </div></div></div>
    )
}
