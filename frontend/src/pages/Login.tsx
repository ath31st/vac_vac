import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../components/input/InputField';
import SubmitButton from '../components/button/SubmitButton';
import ErrorMessage from '../components/message/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import SignInUpForm from '../components/form/SignInUpForm';
import SignInUpContainer from '../components/container/SignInUpContainer';
import LabelWithLink from '../components/label/LabelWithLink';
import { AppDispatch, RootState } from '../redux/store';

const Login: React.FC = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', formState.email);
    formData.append('password', formState.password);

    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vacancies');
    }
  }, [isAuthenticated, navigate]);

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
        <LabelWithLink>
          Don`t have an account? <Link to="/signup">Register here</Link>
        </LabelWithLink>
      </SignInUpForm>
    </SignInUpContainer>
  );
};

export default Login;
