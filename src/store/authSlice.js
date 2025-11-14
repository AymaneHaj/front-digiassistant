import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import the *real* API service we just made
import api from '../services/api';

// --- Async Thunks (Handling API calls) ---

/**
 * Thunk for logging in a user.
 * createAsyncThunk(type, payloadCreator)
 */
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // Use the real api service
            const response = await api.post('/api/auth/login', { email, password });
            // The response.data should be { user: {...}, token: "..." }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Login failed');
        }
    }
);

/**
 * Thunk for registering a user.
 */
export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password, company_name, sector, company_size }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/auth/register', { 
                email, 
                password, 
                company_name, 
                sector, 
                company_size 
            });
            // The response.data should be { user: {...}, token: "..." }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Registration failed');
        }
    }
);

/**
 * Thunk for fetching current user info (including score).
 */
export const fetchUserInfo = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/auth/me');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch user info');
        }
    }
);

// --- Initial State ---

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: true, // Start as true to check auth status on load
    error: null,
};

// --- The Slice ---

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    // Reducers: Handle synchronous state changes
    reducers: {
        /**
         * Handles manual logout.
         */
        logout: (state) => {
            // Clear all localStorage data
            localStorage.clear();
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        /**
         * Checks auth status on initial app load.
         */
        checkAuthStatus: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
                // Fetch user info including score
                // This will be handled by the async thunk
            } else {
                state.isAuthenticated = false;
            }
            state.isLoading = false; // Finished checking
        },
    },

    // Extra Reducers: Handle async state changes from thunks
    extraReducers: (builder) => {
        builder
            // --- Login Thunk ---
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                // Clear any old data first
                localStorage.clear();
                // Set new token
                localStorage.setItem('token', token);
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = user;
                state.token = token;
                state.error = null;
                // Note: Chat state will be cleared by the chatSlice reducer
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // error message from rejectWithValue
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            // --- Register Thunk ---
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                // Clear any old data first
                localStorage.clear();
                // Set new token
                localStorage.setItem('token', token);
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = user;
                state.token = token;
                state.error = null;
                // Note: Chat state will be cleared by the chatSlice reducer
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            // --- Fetch User Info Thunk ---
            .addCase(fetchUserInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export the synchronous actions
export const { logout, checkAuthStatus } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;