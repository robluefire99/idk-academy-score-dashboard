import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = '/api/auth';

export const login = createAsyncThunk('auth/login', async creds => {
  const res = await axios.post(`${API}/login`, creds);
  return res.data;
});

export const loadMe = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  const res = await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null },
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          role: action.payload.role
        };
      })
      .addCase(loadMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
