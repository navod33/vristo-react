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

export const getRoles = async () => {
    try {
        const response = await apiClient.get('/api/v1/roles');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getPermissions = async () => {
    try {
        const response = await apiClient.get('/api/v1/permissions');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getRoleById = async (id: number) => {
    try {
        const response = await apiClient.get(`/api/v1/roles/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const createRole = async (roleData: { name: string; permissions: number[] }) => {
    try {
        const response = await apiClient.post('/api/v1/roles', roleData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id: number, roleData: { name: string; permissions: number[] }) => {
    try {
        const response = await apiClient.patch(`/api/v1/roles/${id}`, roleData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id: number) => {
    try {
        const response = await apiClient.delete(`/api/v1/roles/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
