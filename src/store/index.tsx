import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authSlice from './authSlice'; // Import the authSlice

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth: authSlice, // Add auth reducer here
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch; // Optional: For better typing in useDispatch

export default store;
