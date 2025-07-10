import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import scoreReducer from './scoreSlice';
import lecturerReducer from './lecturerSlice';
import studentReducer from './studentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    score: scoreReducer,
    lecturer: lecturerReducer,
    student: studentReducer
  }
});