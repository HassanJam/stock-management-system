// /frontend/src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize state from localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token');
    });

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user'); // Clear user from local storage
        localStorage.removeItem('token'); // Clear token from local storage
    };

    // Effect to persist user and token to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user'); // Clear user if null
        }
        
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Clear token if null
        }
    }, [user, token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);