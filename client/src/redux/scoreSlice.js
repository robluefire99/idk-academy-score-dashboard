import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = '/api/scores';

export const fetchScores = createAsyncThunk(
  'score/fetch',
  async (params, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .get(API, { params, headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

export const createScore = createAsyncThunk(
  'score/create',
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .post(API, data, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

export const updateScore = createAsyncThunk(
  'score/update',
  async ({ id, score }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .put(`${API}/${id}`, { score }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

export const updateFeedback = createAsyncThunk(
  'score/updateFeedback',
  async ({ id, feedback }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return axios
      .put(`${API}/${id}`, { feedback }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data);
  }
);

const scoreSlice = createSlice({
  name: 'score',
  initialState: { list: [], meta: {} },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchScores.fulfilled, (state, action) => {
      state.list = action.payload.docs;
      state.meta = {
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    });
  }
});

export default scoreSlice.reducer;
