import React, { createContext, useContext, useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const [ userId , setusrid] = useState('');

    const registerUser = (username) => {
        setLoggedInUsername(username);
    };


    const login = (accessToken) => {

        try {
            localStorage.setItem('token',accessToken);
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            console.log(accessToken)
            console.log(decodedToken);
            
            // console.log(decodedToken.username)
            console.log(decodedToken.id)
            if (decodedToken) {
                const username = decodedToken.username;
                const userid = decodedToken.id;
                setLoggedInUsername(username);
                setusrid(userid);
                localStorage.setItem('loggedInUsername', username);
                localStorage.getItem('getuserid',userid );
                
            } else {
                console.error('Failed to decode access token');
            }
        } catch (error) {
            console.error("Failed to decode access token:", error);
            return null;
        }
    };
    const logout = () => {
        setLoggedInUsername('');
        localStorage.removeItem('loggedInUsername');
        localStorage.removeItem('token');
        alert('logout successfully')
        console.log('logout successfully')
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          login(token);
        }
      }, []);

    return (
        <AuthContext.Provider value={{ loggedInUsername, login, logout,registerUser,userId
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
