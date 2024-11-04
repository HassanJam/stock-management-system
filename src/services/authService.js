// /frontend/src/services/authService.js
import axios from 'axios';
import auth_api from '../api/api.js'

const API_URL = `${auth_api}`;

export const register = async (username, password, department) => {
    return await axios.post(`${API_URL}/register`, { username, password, department });
};

export const login = async (username, password) => {
    return await axios.post(`${API_URL}/login`, { username, password });
};
