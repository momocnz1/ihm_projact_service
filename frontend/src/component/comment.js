import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentForm() {
  const [comment, setNewComment] = useState('');
  const [posts, setPosts] = useState([]);

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
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
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
  const handleCommentChange = (postId, value) => {
    const newPosts = [...posts];
    const postIndex = newPosts.findIndex(post => post.id === postId);
    newPosts[postIndex].comment = value;
    setPosts(newPosts);
  };


  return (
    <div>
      {posts.map(post => (
        <div>
          <input type="comment"
           value={post.comment || ''}
           onChange={(e) => handleCommentChange(post.id, e.target.value)}/>
          <button className='send'
            onClick={() => handleSubmit(post.id,post.comment)}>Submit</button>
        </div>
        ))}
    </div>
  );
}

export default CommentForm;
