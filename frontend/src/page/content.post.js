import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './content.post.css'
import { Link } from 'react-router-dom';


function Post({_post, afterSubmit}) {
    // const [count, setCount] = useState(0);
    const [post,setPostData] = useState(_post)
    const [comment, setComment] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [isLiked,setIsLiked] = useState(false);
    // const [isLikedNow,setIsLikedNow] = useState

    const loadPostById = async () => {
        const postresult = await axios.get(`http://localhost:8000/post/${post.id}/`)
        console.log(postresult)
        setPostData(postresult.data)
        
    }

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
            
            setComment('');
            await loadPostById()            
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/post/${post.id}/like`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            const newLikes = response.data.likes;
        console.log(likes)
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
        <div className='postcontent' >
            <p >{post.user.username}</p>
            <div className='postcontenttext' >{post.content}</div>
            <button className={isLiked ? 'likebuttom liked' : 'likebuttom'}  onClick={handleLike}></button>
                <span className='likes'>{likes} Likes</span>
            <ul className='Commentcontent'>
            {showAllComments 
                ? post.comments && post.comments.map(comment => (
                    <div key={comment.id} className='commentcontent'>
                            <div className='usernamecomment' >{comment.user.username}
                            <div className='connetcomment' >{comment.content}</div>
                        </div>
                    </div>
                )) : post.comments.slice(0, 5).map(comment => (
                    <div key={comment.id} className='commentcontent'>
                        <div className='usernamecomment'>{comment.user.username}</div>
                        <div className='connetcomment' >{comment.content}</div>
                    </div>
                ))
            }
            {post.comments.length > 5 && (
                <button className='ShowAllcomment' onClick={() => setShowAllComments(!showAllComments)}>
                    {showAllComments ? "Hide" : "Show More"}
                </button>
            )}
                <div>
                    <input type="comment" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}  
                    placeholder="Add a comment..." />
                    <div  >
                    <button  style={{display: 'flex',
                    alignself: 'flex-end',}}className='send'
                    onClick={() => handleSubmit(post.id)}>Submit</button>
                    </div>
                </div>
            </ul>

    </div>
    )

}



function Content() {
    const [posts, _setPosts] = useState([]);

    const [effect,_setEffect] = useState({})

    const setPosts = (data) => {
        
    
        let commentsObject = {}


        console.log("setpost posts : ",data)

        data.forEach( p => {
            commentsObject[p.id] = ""
        })

        console.log("setpost comment : ",commentsObject)

        _setPosts(data);

    } 

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
    }, [effect]);

    const realoadPosts = async () => {
        // const response = await axios.get('http://localhost:8000/post');
        // setPosts(response.data);
        // console.log(response.data)
        _setEffect({})
    
        }
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Link to="/post" className='Creatpost'></Link>
            </div>
            <div className='Postcontent' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {posts && posts.map(post => (
                    <Post afterSubmit={realoadPosts} key={post.id} _post={post}/>
                ))}
            </div>
            
        </div>
    );
}

export default Content;
