import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Get all roles
export const getRoles = async (token: string) => {
    try {
        // const response = await axios.get(`${API_URL}/api/v1/roles`);
        const response = await axios.get(`${API_URL}/api/v1/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
