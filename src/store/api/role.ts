import axios from 'axios';

const API_URL = 'http://expo.ecentic.com';

// Get all roles
export const getRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/roles`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
