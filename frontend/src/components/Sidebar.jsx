import React from 'react'
import styled from 'styled-components'

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
  return (
    <SidebarContainer>
      <SidebarButton>Vacancies</SidebarButton>
      <SidebarButton>My Vacancies</SidebarButton>
      <SidebarButton>Settings</SidebarButton>
      <SidebarButton>Logout</SidebarButton>
    </SidebarContainer>
  )
}

export default Sidebar
