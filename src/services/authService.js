// /frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username, password, department) => {
    return await axios.post(`${API_URL}/register`, { username, password, department });
};

export const login = async (username, password) => {
    return await axios.post(`${API_URL}/login`, { username, password });
};
