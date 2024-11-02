// /frontend/src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Stores user data including department
    const [token, setToken] = useState(null); // Store JWT token

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Clear token from local storage
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
