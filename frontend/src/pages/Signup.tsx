import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @ts-expect-error TS(6142): Module '../components/input/InputField' was resolv... Remove this comment to see the full error message
import InputField from '../components/input/InputField';
// @ts-expect-error TS(6142): Module '../components/button/SubmitButton' was res... Remove this comment to see the full error message
import SubmitButton from '../components/button/SubmitButton';
// @ts-expect-error TS(6142): Module '../components/message/ErrorMessage' was re... Remove this comment to see the full error message
import ErrorMessage from '../components/message/ErrorMessage';
// @ts-expect-error TS(6142): Module '../components/select/SelectField' was reso... Remove this comment to see the full error message
import SelectField from '../components/select/SelectField';
import { useNavigate } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../components/form/SignInUpForm' was resol... Remove this comment to see the full error message
import SignInUpForm from '../components/form/SignInUpForm';
// @ts-expect-error TS(6142): Module '../components/container/SignInUpContainer'... Remove this comment to see the full error message
import SignInUpContainer from '../components/container/SignInUpContainer';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
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
      } catch (error) {
        console.error('Error during registration:', error);
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response && error.response.data) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          setError(`Registration failed with cause: ${error.response.data}.`);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SignInUpContainer>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SignInUpForm onSubmit={handleSubmit}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h2>Signup</h2>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="text"
          name="firstname"
          placeholder="First name"
          value={formData.firstname}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="text"
          name="lastname"
          placeholder="Last name"
          value={formData.lastname}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectField
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={roles}
          placeholder={'Select a role'}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {error && <ErrorMessage>{error}</ErrorMessage>}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SubmitButton type="submit" onClick={handleSubmit}>
          Sign Up
        </SubmitButton>
      </SignInUpForm>
    </SignInUpContainer>
  );
};

export default Signup;
