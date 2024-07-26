import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { performLogout } from '../redux/authSlice'
import StyledLink from './link/StyledLink'
import StyledButtonLink from './button/StyledButtonLink'

const SidebarContainer = styled.div`
    width: 200px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <StyledLink to="/vacancies">Vacancies</StyledLink>
      <StyledLink to="/my-vacancies">My Vacancies</StyledLink>
      <StyledButtonLink onClick={handleLogout} to="">Logout</StyledButtonLink>
    </SidebarContainer>
  )
}

export default Sidebar
