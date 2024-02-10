import React, { createContext, useContext, useState } from 'react';
// import jwt_decode from "jwt-decode";

// const decodeAccessToken = (accessToken) => {
//     try {
//         const parts = accessToken.split('.');
//         const decodedToken = JSON.parse(atob(parts[1]));

//         console.log(decodedToken);
//         return decodedToken
//     } catch (error) {
//         console.error("Failed to decode access token:", error);
//         return null;
//     }
// };
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUsername, setLoggedInUsername] = useState('');


    const login = (accessToken) => {

        try {
            const parts = accessToken.split('.');
            const decodedToken = JSON.parse(atob(parts[1]));
            // console.log(decodedToken);
            // console.log(decodedToken.username)
            if (decodedToken) {
                const username = decodedToken.username;
                setLoggedInUsername(username);
                localStorage.setItem('loggedInUsername', username);
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
    };

    return (
        <AuthContext.Provider value={{ loggedInUsername, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
