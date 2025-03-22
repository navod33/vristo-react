import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// API functions using the Axios instance

// Get all users
export const getUsers = async () => {
    try {
        const response = await apiClient.get('/api/v1/users');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Get user by ID with optional branch relationship
export const getUserById = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/v1/users/${id}?with[0]=branch`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new user
export const createUser = async (userData: any) => {
    try {
        const response = await apiClient.post('/api/v1/users', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a user
export const updateUser = async (id: number, userData: any) => {
    try {
        const response = await apiClient.patch(`/api/v1/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
    try {
        await apiClient.delete(`/api/v1/users/${id}`);
    } catch (error) {
        throw error;
    }
};
