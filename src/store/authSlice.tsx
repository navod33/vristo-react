import { createSlice } from '@reduxjs/toolkit';
import { logout } from './api/auth';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logoutUser: (state) => {
            if (state.token) {
                logout(state.token); // Call logout API
            }
            localStorage.removeItem('token'); // Remove token from storage
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
