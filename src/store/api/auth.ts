import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Handle Login
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/login`, {
            email,
            password,
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Handle Logout
export const logout = async (token: string) => {
    try {
        console.log('eeeeeee', token);
        await axios.get(`${API_URL}/api/v1/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// send reset passwod link
export const passwordResetLink = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/password/email`, {
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Handle reset passwod link
export const passwordReset = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/password/reset`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get authenticated user
export const getAuthenticatedUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
