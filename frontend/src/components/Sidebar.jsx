import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { performLogout } from '../redux/authSlice'

const SidebarContainer = styled.div`
    width: 200px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const SidebarButton = styled.div`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
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
      <SidebarButton>Vacancies</SidebarButton>
      <SidebarButton>My Vacancies</SidebarButton>
      <SidebarButton>Settings</SidebarButton>
      <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
    </SidebarContainer>
  )
}

export default Sidebar
