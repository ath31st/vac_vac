import styled from 'styled-components'
import Vacancy from '../components/Vacancy'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import VacancyDetails from '../components/VacancyDetails'

const Container = styled.div`
    display: flex;
`

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    padding: 20px;
`

const VacanciesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Vacancies = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(null)

  const vacancies = [
    {
      id: 1,
      title: 'Vacancy title 1',
      description: 'Vacancy short description (first 50 characters)...',
      englishLevel: 'eng 1',
      grade: 'grade 1',
    },
    {
      id: 2,
      title: 'Vacancy title 2',
      description: 'Vacancy short description (first 50 characters)...',
      englishLevel: 'eng 2',
      grade: 'grade 2',
    },
    {
      id: 3,
      title: 'Vacancy title 3',
      description: 'Vacancy short description (first 50 characters)...',
      englishLevel: 'eng 3',
      grade: 'grade 3',
    },
  ]

  const handleVacancyClick = (vacancy) => {
    setSelectedVacancy(vacancy)
  }

  return (
    <Container>
      <Sidebar/>
      <MainContent>
        <VacanciesContainer>
          {vacancies.map((vacancy) => (
            <Vacancy
              key={vacancy.id}
              title={vacancy.title}
              description={vacancy.description}
              onClick={() => handleVacancyClick(vacancy)}
            />
          ))}
        </VacanciesContainer>
        {selectedVacancy && <VacancyDetails vacancy={selectedVacancy}/>}
      </MainContent>
    </Container>
  )
}

export default Vacancies