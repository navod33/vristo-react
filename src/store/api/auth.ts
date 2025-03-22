import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token automatically
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

// **Handle Login**
export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/api/v1/login', { email, password });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// **Handle Logout**
export const logout = async () => {
    try {
        await apiClient.get('/api/v1/logout');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// **Send Reset Password Link**
export const passwordResetLink = async (email: string) => {
    try {
        const response = await apiClient.post('/api/v1/password/email', { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// **Handle Reset Password**
export const passwordReset = async (data: any) => {
    try {
        const response = await apiClient.post('/api/v1/password/reset', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// **Get Authenticated User**
export const getAuthenticatedUser = async () => {
    try {
        const response = await apiClient.get('/api/v1/user');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
