import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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

const Header = () => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.auth.user);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <HeaderContainer>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h1>Vac Vac Project</h1>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <NavLinks>
        {user !== null ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text>{user.email}</Text>
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text>You are not authorized</Text>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
