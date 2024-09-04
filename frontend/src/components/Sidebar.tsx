import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { performLogout } from '../redux/authSlice';
import StyledLink from './link/StyledLink';
import StyledButtonLink from './button/StyledButtonLink';

const SidebarContainer = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const handleLogout = async () => {
    try {
      await dispatch(performLogout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SidebarContainer>
      <StyledLink to="/vacancies">Vacancies</StyledLink>
      {role === 0 ? (
        <StyledLink to="/my-vacancies">My Vacancies</StyledLink>
      ) : (
        <>
          <StyledLink to="/active-vacancies">Active Vacancies</StyledLink>
          <StyledLink to="/create-vacancy">Create Vacancy</StyledLink>
        </>
      )}
      <StyledButtonLink onClick={handleLogout} to="">
        Logout
      </StyledButtonLink>
    </SidebarContainer>
  );
};

export default Sidebar;
