import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../components/input/InputField'
import SubmitButton from '../components/button/SubmitButton'
import ErrorMessage from '../components/message/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/authSlice'
import SignInUpForm from '../components/form/SIgnInUpForm'
import SignInUpContainer from '../components/container/SignInUpContainer'

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formState))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vacancies')
    }
  }, [isAuthenticated, navigate])

  return (
    <SignInUpContainer>
      <SignInUpForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">Sign In</SubmitButton>
      </SignInUpForm>
    </SignInUpContainer>
  )
}

export default Login