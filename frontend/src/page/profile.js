import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import './profile.css'

export default function Profile() {
  const [images, setImages] = useState(null);
  const [imagesURLs, setImagesURLs] = useState([]);
  const { userId } = useAuth();


  useEffect(() => {
    if (!images || images.length < 1) return;
    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)))
    setImagesURLs(newImagesUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  async function uploadImages() {
    try {
      if (images.length === 0) {
        alert('Please select an image to upload');
        return;
      }

      const formData = new FormData();
      images.forEach((image) => formData.append('profileImage', image));

      // Replace 'http://localhost:3000' with your NestJS server URL
      const imageProfile = await axios.post(`http://localhost:8000/user/${userId}/profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(imageProfile)
      alert('Profile images uploaded successfully');
    } catch (error) {
      console.error('Error uploading profile images:', error);
    }
  }

  return (
    <div>
      <div className='profileedit'>
        <div>Profile</div>
        <input type='file' multiple accept='image/*' onChange={onImageChange} />
        <button onClick={uploadImages}>Upload Profile Images</button>
        {imagesURLs.map((imageSrc, index) => (
          <img key={index} src={imageSrc} alt="" />
        ))}
        <div></div>
      </div>
    </div>
  )
}
