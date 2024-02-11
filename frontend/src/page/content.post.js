import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './content.post.css'
import { Link } from 'react-router-dom';


function Content() {
    const [posts, setPosts] = useState([]);
    const [comment, setNewComment] = useState('');

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/post');
                setPosts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (postId) => {
        try {
            const commentresult = await axios.post(`http://localhost:8000/post/${postId}/comment`, {
                content: comment
            },{
                headers:{
                    Authorization: 'Bearer '+ localStorage.getItem('token')
                }
            });
            console.log(commentresult)
            // console.log(commentresult.parent)
            const response = await axios.get('http://localhost:8000/post');
            setPosts(response.data);
            
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Link to="/post" className='Creatpost'></Link>
            </div>
            <div className='Postcontent' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {posts && posts.map(post => (
                    <div key={post.id} className='postcontent' >
                        <p >{post.user.username}</p>
                        <p >{post.content}</p>
                        <ul className='Commentcontent'>
                            {post.comments && post.comments.map(comment => (
                                <div key={comment.id} className='commentcontent'>
                                     <div className='usernamecomment' style={{margin:'0.2rem',}}>{comment.user.username}
                                     <div className='connetcomment' >{comment.content}</div>
                                    </div>
                                </div>
                            ))}
                            <div>
                                <input type="comment" 
                                value={comment}
                                onChange={(e) => setNewComment(e.target.value)}  
                                placeholder="Add a comment..." />
                                <button className='send' 
                                onClick={() => handleSubmit(post.id)}>Submit</button>
                            </div>
                        </ul>

                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Content;
