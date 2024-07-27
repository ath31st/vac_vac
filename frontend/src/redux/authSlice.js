import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_BASE_URL

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth`, formData)
      const { token } = response.data
      localStorage.setItem('jwtToken', token)
      return { token }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : 'Server error')
    }
  })

export const performLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('jwtToken')
      return {}
    } catch (error) {
      return rejectWithValue('Logout failed')
    }
  })

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('jwtToken'),
    isAuthenticated: !!localStorage.getItem('jwtToken'),
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    }).addCase(login.rejected, (state, action) => {
      state.error = action.payload
      state.token = null
      state.isAuthenticated = false
    }).addCase(performLogout.fulfilled, (state) => {
      state.token = null
      state.isAuthenticated = false
      state.error = null
    }).addCase(performLogout.rejected, (state, action) => {
      state.error = action.payload
    })
  },
})

export default authSlice.reducer
