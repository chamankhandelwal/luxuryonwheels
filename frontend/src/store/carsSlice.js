import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (params = {}) => {
  const { data } = await api.get('/cars', { params });
  return data.cars;
});

export const fetchCar = createAsyncThunk('cars/fetchCar', async (id) => {
  const { data } = await api.get(`/cars/${id}`);
  return data.car;
});

export const saveCar = createAsyncThunk('cars/saveCar', async ({ id, payload }) => {
  const { data } = id ? await api.put(`/cars/${id}`, payload) : await api.post('/cars', payload);
  return data.car;
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async (id) => {
  await api.delete(`/cars/${id}`);
  return id;
});

export const toggleSold = createAsyncThunk('cars/toggleSold', async ({ id, sold }) => {
  const { data } = await api.patch(`/cars/${id}/sold`, { sold });
  return data.car;
});

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCar.pending, (state) => {
        state.loading = true;
        state.selected = null;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveCar.fulfilled, (state, action) => {
        const index = state.items.findIndex((car) => car._id === action.payload._id);
        if (index >= 0) state.items[index] = action.payload;
        else state.items.unshift(action.payload);
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.items = state.items.filter((car) => car._id !== action.payload);
      })
      .addCase(toggleSold.fulfilled, (state, action) => {
        const index = state.items.findIndex((car) => car._id === action.payload._id);
        if (index >= 0) state.items[index] = action.payload;
      });
  }
});

export default carsSlice.reducer;
