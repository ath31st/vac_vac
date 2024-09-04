import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const Text = styled.span`
  color: #ccc;
`;

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderContainer>
      <h1>Vac Vac Project</h1>
      <NavLinks>
        {user ? <Text>{user.email}</Text> : <Text>You are not authorized</Text>}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
