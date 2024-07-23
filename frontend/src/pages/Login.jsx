import React, { useState } from 'react'
import styled from 'styled-components'
import InputField from '../components/input/InputField'
import SubmitButton from '../components/button/SubmitButton'
import ErrorMessage from '../components/message/ErrorMessage'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #b7b7b7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState.email === '') {
      setError('Email is required')
    } else if (formState.password === '') {
      setError('Password is required')
    } else {
      alert('Submitted')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
        <SubmitButton type="submit" onClick={handleSubmit}>
          Sign In
        </SubmitButton>
      </Form>
    </Container>
  )
}

export default Login