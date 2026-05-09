import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import carsReducer from './carsSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer
  }
});
