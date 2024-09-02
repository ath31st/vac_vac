import React from 'react';
import styled from 'styled-components';
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
    <Container>
      <Title>Welcome to the Job Search and Posting Service!</Title>
      <ButtonContainer>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/signup">Sign Up</StyledLink>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;
