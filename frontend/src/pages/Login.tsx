import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @ts-expect-error TS(6142): Module '../components/input/InputField' was resolv... Remove this comment to see the full error message
import InputField from '../components/input/InputField';
// @ts-expect-error TS(6142): Module '../components/button/SubmitButton' was res... Remove this comment to see the full error message
import SubmitButton from '../components/button/SubmitButton';
// @ts-expect-error TS(6142): Module '../components/message/ErrorMessage' was re... Remove this comment to see the full error message
import ErrorMessage from '../components/message/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
// @ts-expect-error TS(6142): Module '../components/form/SignInUpForm' was resol... Remove this comment to see the full error message
import SignInUpForm from '../components/form/SignInUpForm';
// @ts-expect-error TS(6142): Module '../components/container/SignInUpContainer'... Remove this comment to see the full error message
import SignInUpContainer from '../components/container/SignInUpContainer';
// @ts-expect-error TS(6142): Module '../components/label/LabelWithLink' was res... Remove this comment to see the full error message
import LabelWithLink from '../components/label/LabelWithLink';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const error = useSelector((state) => state.auth.error);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<{ token: any; u... Remove this comment to see the full error message
    dispatch(login(formState));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/vacancies');
    }
  }, [isAuthenticated, navigate]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SignInUpContainer>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SignInUpForm onSubmit={handleSubmit}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h2>Login</h2>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {error && <ErrorMessage>{error}</ErrorMessage>}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SubmitButton type="submit">Sign In</SubmitButton>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <LabelWithLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          Don't have an account? <Link to="/signup">Register here</Link>
        </LabelWithLink>
      </SignInUpForm>
    </SignInUpContainer>
  );
};

export default Login;
