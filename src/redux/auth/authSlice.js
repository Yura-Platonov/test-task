import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/login/', credentials);
    const userData = response.data;

    dispatch(loginSuccess(userData));

    return userData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return null; 
    } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = payload.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = payload.error;
        state.isLoading = false;
      });
      builder.addCase(loginSuccess, (state, { payload }) => {
        state.user = payload.user; // Обновите пользователя, если есть информация о пользователе
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      });
  
      builder.addCase(logoutSuccess, (state) => {
        state.user = {};
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      });
   },
  reducers: {},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
