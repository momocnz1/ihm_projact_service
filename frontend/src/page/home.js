import React,{useState,useEffect} from 'react';
import './home.css';
import Banner from '../component/banner';
import axios from 'axios';
import PostCard from '../component/postcard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sortedPostsLike, setSortedPostsLike] = useState([]);
  const [sortedPost, setSortedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/post');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
useEffect(() => {
  const sortedPostsLikes = [...posts].sort((a, b) => b.likes - a.likes);
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  setSortedPostsLike(sortedPostsLikes);
  setSortedPosts(sortedPosts);
}, [posts]);
console.log(sortedPost)
console.log(sortedPostsLike)
  console.log(posts)
  return (
    <div>
      <div>
        <Banner/>
      </div>
      <div className='Popular'>
        <p style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '30px' }}>Popular</p>
      </div>
      <div >
          <div className='Postcontent' style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-between'}}>
          {showMore 
          ? sortedPostsLike.map((post) => (
                  <div key={post.id} className="post-card">
                  <div> <PostCard post={post} /></div>
                  </div>
            )) : posts.slice(0,4).map((post) => (
              <div key={post.id} className="post-card" >
              <PostCard post={post} />
              </div>

            )) 
          
          }</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            { posts.length > 4 && (
                <button className='showwMore' onClick={() => setShowMore(!showMore)}>
                  {showMore ?  "Hide" : "Show More"}
                </button>
            )}</div>
      </div>
      <div className='New'>
        <p style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '30px' }}>New Toppic!!!!</p>
      </div>
      <div >
          <div className='Postcontent' style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-between'}}>
          {showMore 
          ? sortedPost.map((post) => (
                  <div key={post.id} className="post-card">
                  <div> <PostCard post={post} /></div>
                  </div>
            )) : posts.slice(0,4).map((post) => (
              <div key={post.id} className="post-card" >
              <PostCard post={post} />
              </div>

            )) 
          
          }</div>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            { posts.length > 4 && (
                <button className='showwMore' onClick={() => setShowMore(!showMore)}>
                  {showMore ?  "Hide" : "Show More"}
                </button>
            )}</div>
      </div>
    </div>
  );
};

export default Home;
