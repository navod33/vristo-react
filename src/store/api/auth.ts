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
        await axios.get(`${API_URL}/api/v1/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
