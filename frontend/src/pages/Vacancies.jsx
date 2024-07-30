import styled from 'styled-components'
import Vacancy from '../components/Vacancy'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import VacancyDetails from '../components/VacancyDetails'
import axios from '../config/axiosConfig'
import { useSelector } from 'react-redux'

const Container = styled.div`
    display: flex;
`

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
`

const VacanciesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`

const Vacancies = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(null)
  const [vacancies, setVacancies] = useState([])
  const [view, setView] = useState('all')
  const role = useSelector(state => state.auth.user?.role)

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const endpoint = view === 'my'
          ? role === 0
            ? `/api/v1/vacancies/my`
            : `/api/v1/vacancies/active`
          : `/api/v1/vacancies`
        const response = await axios.get(endpoint)
        setVacancies(response.data)
      } catch (error) {
        console.error('Error fetching Vacancies:', error)
      }
    }

    fetchVacancies()
  }, [view, role])

  const handleVacancyClick = (vacancy) => {
    if (selectedVacancy === vacancy) {
      setSelectedVacancy(null)
    } else {
      setSelectedVacancy(vacancy)
    }
  }

  return (
    <Container>
      <Sidebar setView={setView}/>
      <MainContent>
        <VacanciesContainer>
          {vacancies.map((vacancy) => (
            <Vacancy
              key={vacancy.id}
              title={vacancy.title}
              description={vacancy.description}
              tags={vacancy.tags}
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