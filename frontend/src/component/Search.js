import React, { useState, useEffect } from 'react';
import './Search.css'
import { useNavigate } from 'react-router';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8000/post/search/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePostClick = (postId) => {
    console.log('Clicked post with ID:', postId);
    // หรือสามารถส่ง postId ไปยังฟังก์ชันอื่นๆ เพื่อทำงานเพิ่มเติมตามต้องการ
    navigate(`/post/${postId}`);
    setSearchTerm('');
    console.log(postId)
  };
  console.log('searchResults:', searchResults);



  return (
    <div  style={{ display: 'flex', 
    flexDirection: 'column', 
    position: 'relative',}}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {searchTerm &&  (
      <div style={{ position: 'absolute', 
      top: '100%', 
      left: 0, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      padding: 0 ,
      
      }} >
      {searchResults.map((post) => (
      <div key={post.id} onClick={() => 
      handlePostClick(post.id)} style={{ cursor: 'pointer',backgroundColor:'#fff'}} className='sreachItem'>
      {post.content.length > 50 ? post.content.substring(0, 50) + 
      '...' : post.content}
      </div>
        ))}
      </div>
      )}
      
    </div>
  );
};

export default Search;