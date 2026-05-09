import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

const savedToken = localStorage.getItem('low_token');
const savedUser = localStorage.getItem('low_user');

export const loginAdmin = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: savedToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('low_token');
      localStorage.removeItem('low_user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('low_token', action.payload.token);
        localStorage.setItem('low_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
