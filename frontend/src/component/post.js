import React, { useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('image', image);
            const response = await axios.post('http://localhost:8000/posts', {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Post created:', response.data);
            // สิ่งที่คุณต้องการทำเมื่อโพสต์ถูกสร้างสำเร็จ
        } catch (error) {
            console.error('Error creating post:', error);
            // สิ่งที่คุณต้องการทำเมื่อเกิดข้อผิดพลาดในการสร้างโพสต์
        }
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    return (
        <div>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content"
            />
            <input
                type="file"
                onChange={handleImageChange}
            />
            <button onClick={handleSubmit}>Create Post</button>
        </div>
    );
};

export default Post;
