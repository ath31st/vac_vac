import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from '../components/input/InputField'
import SubmitButton from '../components/button/SubmitButton'
import ErrorMessage from '../components/message/ErrorMessage'
import SelectField from '../components/select/SelectField'
import { useNavigate } from 'react-router-dom'
import SignInUpForm from '../components/form/SIgnInUpForm'
import SignInUpContainer from '../components/container/SignInUpContainer'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  const [roles, setRoles] = useState([])
  const [error, setError] = useState('')
  const apiUrl = process.env.REACT_APP_API_BASE_URL
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      formData.password === '' ||
      formData.email === '' ||
      formData.firstname === '' ||
      formData.lastname === '' ||
      formData.age === ''
    ) {
      setError('Registration data cannot be empty')
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
    } else {
      setError('')
      try {
        await axios.post(`${apiUrl}/api/v1/users`, formData)
        navigate('/login')
      } catch (error) {
        console.error('Error during registration:', error)
        if (error.response && error.response.data) {
          setError(`Registration failed with cause: ${error.response.data}.`)
        } else {
          setError(`Registration failed. Please try again.`)
        }
      }
    }
  }

  return (
    <SignInUpContainer>
      <SignInUpForm onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <InputField
          type="text"
          name="firstname"
          placeholder="First name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="lastname"
          placeholder="Last name"
          value={formData.lastname}
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
      </SignInUpForm>
    </SignInUpContainer>
  )
}

export default Signup
