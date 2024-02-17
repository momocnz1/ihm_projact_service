import React, { useEffect, useState } from 'react'
import './contentnoti.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function Contennoti() {
    const [notifications,setNotification] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                console.log(userId)
                if (decodedToken.roles && decodedToken.roles.includes('admin')) {
                  setIsAdmin(true);
                  console.log('User is admin');
                  const response = await axios.get('http://localhost:8000/Notification/admin/Notification/'+ userId, {
                      headers: {
                          Authorization: 'Bearer ' + token
                      }
                  });
                  setNotification(response.data);
                  console.log(response.data)
              } else {
                  setIsAdmin(false);
                  console.log('User is not an admin');
                  const response = await axios.get('http://localhost:8000/Notification/user/Notification/' + userId, {
                      headers: {
                          Authorization: 'Bearer ' + token
                      }
                  });
                  setNotification(response.data);
                  console.log(response.data)
              }
          } catch (error) {
              console.error('Error fetching notifications:', error);
          }
      };
        
        fetchData();
    
    },[]);

    // console.log(notifications)
    

    const handleApprove = async (postId) => {
      setIsApproving(true);
      try {
        console.log(postId)
          const response = await axios.post(`http://localhost:8000/post/approvePost/` + postId);
          console.log('Post approved:', response.data);
          setNotification(prevNotifications => prevNotifications.filter(notification => {
            return notification.post.id !== postId;
          }));
          console.log('Post approved');
        } catch (error) {
          console.error('Error while approving post:', error);
      } finally {
          setIsApproving(false);
      }
  };
  
  const handleReject = async (postId,userId) => {
    console.log("Post ID:", postId);
    console.log("User ID:", userId);

    

      setIsRejecting(true);
      try {
          const response = await axios.post(`http://localhost:8000/post/rejectPost/` + postId,
        );
          console.log('Post rejected and deleted.', response);
          console.log('Post rejected and deleted.', response);

          setNotification(prevNotifications => prevNotifications.filter(notification => {
            return notification.post.id !== postId;
          }));
          console.log('Post rejected and deleted.');
      } catch (error) {
          console.error('Error while rejecting post:', error);
      } finally {
          setIsRejecting(false);
      }
  };

  return (
    
    <div className='content' style={{ justifyContent: 'center' }}>
    <h2 style={{color:'#633D19',}}>Notifications</h2>
    <div>
        {notifications.map(notification => (
            <div key={notification.id} className='notificationContent'>
                <strong className='NotificationTitle'>{notification.title}</strong>
                <div className='NotificationContent'> {notification.content}</div>
            {isAdmin && (
                <div>
                <button className='ApproveButtom'  onClick={() => handleApprove(notification.post.id,notification.user.id)} 
                disabled={isApproving}>
                    {isApproving ? 'Approving...' : 'Approve'}
                </button>
                <button className='RejectButtom' onClick={() => handleReject(notification.post.id,notification.user.id)}
                disabled={isRejecting}>
                    {isRejecting ? 'Rejecting...' : 'Reject'}
                </button>
            </div>
            )}
            </div>
        ))}
    </div>
    
    </div>
    
  );
}