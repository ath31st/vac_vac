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

const MyVacancies = () => {
  return (
    <Container>
      <Sidebar/>
      <MainContent>
        <VacanciesList endpoint="/api/v1/vacancies/employee"/>
      </MainContent>
    </Container>
  )
}

export default MyVacancies
