// /frontend/src/services/authService.js
import axios from 'axios';
import api from '../api/api.js';

const { auth_api } = api; // Destructure auth_api from the imported object

export const register = async (username, password, department) => {
    return await axios.post(`${auth_api}/register`, { username, password, department });
};

export const login = async (username, password) => {
    return await axios.post(`${auth_api}/login`, { username, password });
};
