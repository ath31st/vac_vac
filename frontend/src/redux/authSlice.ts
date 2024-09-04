import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

interface User {
  email: string;
  user_id: string;
  role: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginError {
  message: string;
}

export const login = createAsyncThunk<
  LoginResponse,
  FormData,
  { rejectValue: LoginError }
>('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/v1/auth`,
      formData,
      { headers: { 'Content-Type': 'application/json' } }
    );
    const { token } = response.data;

    let user: User;
    try {
      user = jwtDecode<User>(token);
    } catch (decodeError: unknown) {
      console.log(decodeError);
      return rejectWithValue({ message: 'Invalid token' });
    }

    localStorage.setItem('jwtToken', token);
    return { token, user };
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Server error';
    return rejectWithValue({ message: errorMessage });
  }
});

export const performLogout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('jwtToken');
  } catch (error: unknown) {
    console.log(error);
    return rejectWithValue('Logout failed');
  }
});

const initialState: AuthState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  user: localStorage.getItem('jwtToken')
    ? jwtDecode<User>(localStorage.getItem('jwtToken')!)
    : null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<LoginError | undefined>) => {
          state.error = action.payload?.message || 'Unknown error';
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
        }
      )
      .addCase(performLogout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(
        performLogout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || 'Unknown error';
        }
      );
  },
});

export default authSlice.reducer;
