import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubjects = createAsyncThunk(
  'student/fetchSubjects',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .get('/api/subjects', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

export const pickSubject = createAsyncThunk(
  'student/pickSubject',
  async (subjectId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .put('/api/users/me/subject', { subjectId }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

const initialState = { subjects: [], picked: null };

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case 'student/fetchSubjects/fulfilled':
      return { ...state, subjects: action.payload };
    case 'student/pickSubject/fulfilled':
      return { ...state, picked: action.payload.subject };
    default:
      return state;
  }
}
