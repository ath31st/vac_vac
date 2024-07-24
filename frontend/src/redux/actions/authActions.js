import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL, SET_ERROR, LOGOUT } from './types'

const apiUrl = process.env.REACT_APP_API_BASE_URL

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/auth`, formData)
    const { token } = response.data
    localStorage.setItem('jwtToken', token)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    })
    dispatch({
      type: SET_ERROR,
      payload: `Login failed with cause: ${error.response.data.message ||
      error.message}. Please try again.`,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  dispatch({
    type: LOGOUT,
  })
}
