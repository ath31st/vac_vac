import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../redux/authSlice';
// @ts-expect-error TS(6142): Module './link/StyledLink' was resolved to '/home/... Remove this comment to see the full error message
import StyledLink from './link/StyledLink';
// @ts-expect-error TS(6142): Module './button/StyledButtonLink' was resolved to... Remove this comment to see the full error message
import StyledButtonLink from './button/StyledButtonLink';

const SidebarContainer = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const role = useSelector((state) => state.auth.user?.role);

  const handleLogout = async () => {
    try {
      // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<{}, void, Async... Remove this comment to see the full error message
      await dispatch(performLogout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SidebarContainer>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <StyledLink to="/vacancies">Vacancies</StyledLink>
      {role === 0 ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StyledLink to="/my-vacancies">My Vacancies</StyledLink>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <StyledLink to="/active-vacancies">Active Vacancies</StyledLink>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <StyledLink to="/create-vacancy">Create Vacancy</StyledLink>
        </>
      )}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <StyledButtonLink onClick={handleLogout} to="">
        Logout
      </StyledButtonLink>
    </SidebarContainer>
  );
};

export default Sidebar;
