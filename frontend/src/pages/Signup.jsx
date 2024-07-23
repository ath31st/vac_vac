import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import InputField from '../components/input/InputField'
import SubmitButton from '../components/button/SubmitButton'
import ErrorMessage from '../components/message/ErrorMessage'
import SelectField from '../components/select/SelectField'

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

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  const [roles, setRoles] = useState([])
  const [error, setError] = useState('')
  const apiUrl = process.env.REACT_APP_API_BASE_URL

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/roles`)
        setRoles(response.data)
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }

    fetchRoles()
  }, [apiUrl])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      formData.password === '' ||
      formData.email === '' ||
      formData.username === '' ||
      formData.age === ''
    ) {
      setError('Registration data cannot be empty')
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
    } else {
      setError('')
      // Add your form submission logic here
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <InputField
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <SelectField
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roles}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit" onClick={handleSubmit}>
          Sign Up
        </SubmitButton>
      </Form>
    </Container>
  )
}

export default Signup
