import React from 'react';
import './home.css';
import Banner from '../component/banner';

const Home = () => {
  return (
    <div>
      <div>
        <Banner/>
      </div>
      <div className='Popular'>
        <p style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '30px' }}>Popular</p>
      </div>
    </div>
  );
};

export default Home;
