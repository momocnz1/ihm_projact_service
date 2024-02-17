import React, { useState } from 'react';
import "./postcard.css"
import axios from 'axios';

const PostCard = ({ post }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);

    

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/post/${post.id}/like`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            const newLikes = response.data.likes;
            console.log(newLikes)
            if (isLiked) {
                setLikes(prevLikes => prevLikes - 1); // ถ้าผู้ใช้กดไลค์อยู่แล้ว ให้ลดจำนวนไลค์ลง
            } else {
                setLikes(prevLikes => prevLikes + 1); // ถ้าผู้ใช้ยังไม่ได้กดไลค์ ให้เพิ่มจำนวนไลค์
            }

            setIsLiked(!isLiked);

        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    return (
        <div className="post-card" onClick={() => setShowDetails(!showDetails)}>
           <div>
            <p className='postcardcontent'>{post.content}</p>
            <button className={isLiked ? 'likebuttom liked' : 'likebuttom'} onClick={handleLike}></button>
            <span className='likes'>{likes} Likes</span>
            </div>
            {showDetails && (
                <div className="post-details">
                  <p>By : {post.user.username}</p>
                </div>
            )}
        </div>
    );
}

export default PostCard;