import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/input/InputField';
import SubmitButton from '../components/button/SubmitButton';
import ErrorMessage from '../components/message/ErrorMessage';
import SelectField from '../components/select/SelectField';
import SignInUpForm from '../components/form/SignInUpForm';
import SignInUpContainer from '../components/container/SignInUpContainer';
import { useNavigate } from 'react-router-dom';
import { Option as CustomOption } from '../types';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [roles, setRoles] = useState<CustomOption[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/api/v1/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.password === '' ||
      formData.email === '' ||
      formData.firstname === '' ||
      formData.lastname === '' ||
      formData.age === ''
    ) {
      setError('Registration data cannot be empty');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      try {
        await axios.post('/api/v1/users', formData);
        navigate('/login');
      } catch (error: unknown) {
        console.error('Error during registration:', error);
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data
        ) {
          setError(`Registration failed with cause: ${error.response.data}.`);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    }
  };

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
          type="number"
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
          placeholder="Select a role"
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
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </SignInUpForm>
    </SignInUpContainer>
  );
};

export default Signup;
