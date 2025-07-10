import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch students for lecturer's subject(s)
export const fetchMyStudents = createAsyncThunk(
  'lecturer/fetchMyStudents',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .get('/api/users/me/students', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

const initialState = { students: [] };

export default function lecturerReducer(state = initialState, action) {
  switch (action.type) {
    case 'lecturer/fetchMyStudents/fulfilled':
      return { ...state, students: action.payload };
    default:
      return state;
  }
}
