import axios from 'axios';

const API_BASE_URL = "https://my-login-page-cemv.onrender.com/api"; // Render backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Register a new user
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'An error occurred' };
  }
};

// Login user
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'An error occurred' };
  }
};

// Get user by ID
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'An error occurred' };
  }
};

export default api;
