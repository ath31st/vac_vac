import axios from 'axios'
import { performLogout } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const authMiddleware = store => next => action => {
  if (action.type.endsWith('/pending')) {
    const token = store.getState().auth.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  if (action.type.endsWith('/rejected') && action.payload) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status } = action.payload
    if (status === 401) {
      dispatch(performLogout())
      navigate('/login')
    }
  }

  return next(action)
}

export default authMiddleware
