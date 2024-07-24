import styled from 'styled-components'
import Vacancy from '../components/Vacancy'
import Sidebar from '../components/Sidebar'

const Container = styled.div`
    display: flex;
`

const MainContent = styled.div`
    flex-grow: 1;
    padding: 20px;
`;

const VacanciesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Vacancies = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <VacanciesContainer>
          <Vacancy title="Vacancy title 1" description="Vacancy short description (first 50 characters)..." />
          <Vacancy title="Vacancy title 2" description="Vacancy short description (first 50 characters)..." />
          <Vacancy title="Vacancy title 3" description="Vacancy short description (first 50 characters)..." />
        </VacanciesContainer>
      </MainContent>
    </Container>
  )
}

export default Vacancies