import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get user by ID with optional branch relationship
export const getUserById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/users/${id}?with[0]=branch`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new user
export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/api/v1/users/${id}`);
    } catch (error) {
        throw error;
    }
};
