import React, { useState } from 'react';

function CommentForm({ postId,onCommentSubmit }) {
  const [commentText, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim()) return; // ไม่ทำงานถ้าความคิดเห็นว่างเปล่า

    // ส่งความคิดเห็นไปยังฟังก์ชันที่ส่งเข้ามาผ่าน prop
    onCommentSubmit(postId, commentText);
    setContent('');;
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={handleChange}
        placeholder="Write your comment..."
        rows="4"
        cols="50"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
