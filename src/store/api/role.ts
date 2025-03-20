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

export const getPermissions = async (token: string) => {
    try {
        // const response = await axios.get(`${API_URL}/api/v1/roles`);
        const response = await axios.get(`${API_URL}/api/v1/permissions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Get role by ID
export const getRoleById = async (id: number, token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/roles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Create a new role
export const createRole = async (roleData: { name: string; permissions: number[] }, token: any) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/roles`, roleData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update an existing role
export const updateRole = async (id: number, roleData: { name: string; permissions: number[] }, token: string) => {
    try {
        const response = await axios.patch(`${API_URL}/api/v1/roles/${id}`, roleData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a role
export const deleteRole = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/v1/roles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
