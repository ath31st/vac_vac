import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { performLogout } from '../redux/authSlice'
import StyledLink from './link/StyledLink'
import StyledButtonLink from './button/StyledButtonLink'
import SidebarButton from './button/SidebarButton'

const SidebarContainer = styled.div`
    width: 200px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`

const Sidebar = ({ setView }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector(state => state.auth.user?.role)

  const handleLogout = async () => {
    try {
      await dispatch(performLogout())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <SidebarContainer>
      <SidebarButton onClick={() => setView('all')}>Vacancies</SidebarButton>
      <SidebarButton onClick={() => setView('my')}>
        {role === 1 ? 'Active vacancies' : 'My vacancies'}
      </SidebarButton>
      {role === 1 && (
        <StyledLink to="/create-vacancy">Create vacancy</StyledLink>
      )}
      <StyledButtonLink onClick={handleLogout} to="">Logout</StyledButtonLink>
    </SidebarContainer>
  )
}

export default Sidebar
