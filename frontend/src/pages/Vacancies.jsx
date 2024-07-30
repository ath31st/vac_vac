import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import VacanciesList from '../components/VacanciesList'

const Container = styled.div`
    display: flex;
`

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
`

const Vacancies = () => {
  return (
    <Container>
      <Sidebar/>
      <MainContent>
        <VacanciesList endpoint="/api/v1/vacancies"/>
      </MainContent>
    </Container>
  )
}

export default Vacancies
