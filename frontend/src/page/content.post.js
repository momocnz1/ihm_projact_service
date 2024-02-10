import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const commentresult =  await axios.post(`http://localhost:8000/post/${postId}/comment`, {
        content: comment,
      });
      console.log(commentresult)
      console.log(commentresult.parent)
      const response = await axios.get('http://localhost:8000/post');
      setPosts(response.data);
      setNewComment(''); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
        <h2>Post :</h2>
      {posts && posts.map(post => (
      <div key={post.id}>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <input 
            type="text"
            value={comment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={() => handleSubmit(post.id)}>Submit</button>
        <h3>Comments:</h3>
        <ul>
          {post.comments && post.comments.map(comment => (
            <li key={comment.perentId}>
              {comment.content} - {comment.user}
            </li>
          ))}
        </ul>
      </div>
    ))}
    </div>
  );
}

export default Content;
