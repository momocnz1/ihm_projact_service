import React, { useEffect, useState } from 'react'
import './contentnoti.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function Contentnotifition() {
    const [notifications,setNotification] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const adminId = decodedToken.sub;
                console.log(userId)
                const response = await axios.get('http://localhost:8000/Notification/admin/Notification/'
                + adminId,{
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
          
                  });
                setNotification(response.data);
                console.log(response.data)
            }catch(error){
                console.error('Error fetching notifications:', error);
            }
        };
        
        fetchData();
    },[]);
  return (
    
    <div className='content' style={{ justifyContent: 'center' }}>
    <h2 style={{color:'#633D19',}}>Notifications</h2>
    <div>
        {notifications.map(notification => (
            <div key={notification.id} className='notificationContent'>
                <strong className='NotificationTitle'>{notification.title}</strong>
                <div className='NotificationContent'> {notification.content}</div>
            </div>
        ))}
    </div>
    </div>
    
  );
}