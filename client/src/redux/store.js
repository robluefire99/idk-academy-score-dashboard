import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import scoreReducer from './scoreSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    score: scoreReducer
  }
});