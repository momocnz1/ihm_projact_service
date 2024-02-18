import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './content.search.css';


function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMore, setShowMore] = useState(false);

  console.log(postId)
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8000/post/${postId}`);
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`http://localhost:8000/post/${postId}/comment`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const loadPostById = async () => {
    const postresult = await axios.get(`http://localhost:8000/post/${post.id}/`)
    console.log(postresult)
    setPost(postresult.data)
    
}

  const handleNewCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/post/${postId}/comment`, {
        content: newComment,
      },{
        headers:{
            Authorization: 'Bearer '+ localStorage.getItem('token')
        }
    });
      const newCommentData = response.data;
      setComments([...comment, newCommentData]);
      setNewComment('');
      await loadPostById()    
    } catch (error) {
      console.error('Error adding new comment:', error);
    }
  };
  

  return (
    <div className='postConTent'>
      {post && (
        <div className='poSt'>
            <div className='Postusername'><p>Posted by: {post.user.username}</p></div>
                <div className='PostContent'>{post.content}</div>
        </div>
      )}

      <div style={{ display: 'flex',
        flexdirection: 'column',
        alignSelf:'center'}}>
        {post && post.comments && (
           <div className='CommetPost'>
           {showMore
             ? post.comments.map(comment => (
                 <div className='ComMentContent' key={comment.id} >
                   
                   <p className='usernameComment'>By : {comment.user.username}</p>
                   <p className='connetComment'>{comment.content}</p>
                 </div>
               ))
             : post.comments.slice(0, 5).map(comment => (
                 <div className='ComMentContent' key={comment.id}>
                   
                   <p className='usernameComment'>By: {comment.user.username}</p>
                   <p className='connetComment'>{comment.content}</p>
                 </div>
               ))}
           {post.comments.length > 5 && (
             <button className='ShowAllcomment' onClick={() => setShowMore(!showMore)}>
                {showMore ? "Hide" : "Show More"}
             </button>
           )}
         </div>
       )}
      </div>
      <div className='NewComment'>
        <input value={newComment} onChange={e => setNewComment(e.target.value)} className='newComment'/>
        <button onClick={() => handleNewCommentSubmit(post.id)} className='Addcommet'>Add Comment</button>
      </div>
    </div>
  );
}

export default PostDetails;
