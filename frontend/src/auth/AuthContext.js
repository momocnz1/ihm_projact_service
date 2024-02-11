import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUsername, setLoggedInUsername] = useState('');
    const [ userId , setusrid] = useState('');

    const registerUser = (username) => {
        setLoggedInUsername(username);
    };


    const login = (accessToken) => {

        try {
            const parts = accessToken.split('.');
            localStorage.setItem('token',accessToken)
            const decodedToken = JSON.parse(atob(parts[1]));
            console.log(decodedToken);
            // console.log(decodedToken.username)
            console.log(decodedToken.sub)
            if (decodedToken) {
                const username = decodedToken.username;
                const userid = decodedToken.sub;
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

    };

    return (
        <AuthContext.Provider value={{ loggedInUsername, login, logout,registerUser,userId
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
