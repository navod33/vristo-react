import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Get all users
export const getUsers = async (token: string) => {
    try {
        // const response = await axios.get(`${API_URL}/api/v1/users`);
        const response = await axios.get(`${API_URL}/api/v1/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
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
export const createUser = async (token: string, userData: any) => {
    try {
        // const response = await axios.post(`${API_URL}/api/v1/users`, userData);
        const response = await axios.post(`${API_URL}/api/v1/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// update a  user
export const updateUser = async (token: string, id: number, userData: any) => {
    try {
        // const response = await axios.post(`${API_URL}/api/v1/users/${id}`, userData);
        const response = await axios.patch(`${API_URL}/api/v1/users/${id}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
export const deleteUser = async (token: string, id: number) => {
    try {
        // await axios.delete(`${API_URL}/api/v1/users/${id}`);
        await axios.delete(`${API_URL}/api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error;
    }
};
