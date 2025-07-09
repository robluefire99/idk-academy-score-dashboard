import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = '/api/scores';

export const fetchScores = createAsyncThunk(
  'score/fetch',
  async (params, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.get(API, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
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
