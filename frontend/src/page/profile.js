import React, { useEffect, useState } from 'react';
import './profile.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



export default function Profile() {
  const [profile, setprofile] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        // console.log(userId)
        // console.log(decodedToken)
        if (decodedToken.roles && decodedToken.roles.includes('admin')) {
          const response = await axios.get('http://localhost:8000/admin/'
          + userId, {
          headers: {
            Authorization: 'Bearer ' + token
          }

        });
        // console.log(localStorage)
        // console.log(response.data)
        setprofile(response.data);
        } else{
        const response = await axios.get('http://localhost:8000/user/'
          + userId, {
          headers: {
            Authorization: 'Bearer ' + token
          }

        });
        // console.log(localStorage)
        // console.log(response.data)
        setprofile(response.data);}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.put(`http://localhost:8000/user/${userId}`, profile, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      console.log(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className='profileedit'>
        <div style={{
          fontWeight: 'bold',
          fontSize: ' 26px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}>Profile</div>
        <div className='myprofile'>
          <div style={{
            fontWeight: 'bold',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}>my profile</div>
          {profile && (
            <div>
               {editing ? ( 
                <div className='fromedit'>
                  <p>First Name : 
                  <input type="profile" value={profile.fname} onChange={(e) => setprofile({ ...profile, fname: e.target.value })} />
                  </p>
                  <p >Last Name :
                  <input type="profile" value={profile.lname} onChange={(e) => setprofile({ ...profile, lname: e.target.value })} />
                  </p>
                  <p >Username :
                  <input type="profile" value={profile.username} onChange={(e) => setprofile({ ...profile, username: e.target.value })} />
                  </p>
                  <p >Email    : 
                  <input type="emails" value={profile.email} onChange={(e) => setprofile({ ...profile, email: e.target.value })} />
                  </p>
                  <p >Phone    : 
                  <input type="tel" value={profile.phone} onChange={(e) => setprofile({ ...profile, phone: e.target.value })} />
                  </p>
                  <p>Address   :
                  <input type="addr" value={profile.address} onChange={(e) => setprofile({ ...profile, address: e.target.value })} />
                  </p>
                  <p>Password :  
                  <input type="profile" value={profile.password} onChange={(e) => setprofile({ ...profile, password: e.target.value })} />
                  </p>
                  <div className='button-container'>
                  <button className='button-save' onClick={handleSave}style={{display: 'flex', }}>Save</button>
                  <button className='button-cancle' onClick={handleCancel} style={{ display: 'flex', justifyContent: 'flex-end'}}>Cancel</button>
                  </div>
                </div>):(
              <div>
              <p><strong>First Name : </strong>{profile.fname}</p>
              <p><strong>Last Name : </strong>{profile.lname}</p>
              <p><strong>Username : </strong>{profile.username}</p>
              <p><strong>Email : </strong>{profile.email}</p>
              <p><strong>Phone : </strong>{profile.phone}</p>
              <p><strong>Address : </strong>{profile.address}</p>
              <div style={{ 
              fontSize: ' 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
               }}>
              <button onClick={handleEdit} className='buttom-edit'>Edit</button></div>
            </div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
