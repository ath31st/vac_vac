import { LOGIN_SUCCESS, LOGIN_FAIL, SET_ERROR, LOGOUT } from '../actions/types'

const initialState = {
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: null,
  error: null,
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
      }
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: null,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
