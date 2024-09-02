import React from 'react';
import styled from 'styled-components';
// @ts-expect-error TS(6142): Module '../components/link/StyledLink' was resolve... Remove this comment to see the full error message
import StyledLink from '../components/link/StyledLink';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const HomePage = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Title>Welcome to the Job Search and Posting Service!</Title>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ButtonContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StyledLink to="/login">Login</StyledLink>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StyledLink to="/signup">Sign Up</StyledLink>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;
