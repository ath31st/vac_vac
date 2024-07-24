import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavLinks = styled.div`
    display: flex;
    gap: 15px;
`

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Vac Vac Project</h1>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/vacancies">Vacancies</StyledLink>
      </NavLinks>
    </HeaderContainer>
  )
}

export default Header
