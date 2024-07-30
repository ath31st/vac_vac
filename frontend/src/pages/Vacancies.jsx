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
  const role = useSelector(state => state.auth.user?.role)

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('/api/v1/vacancies')
        setVacancies(response.data)
      } catch (error) {
        console.error('Error fetching Vacancies:', error)
      }
    }

    fetchVacancies()
  }, [role])

  const handleVacancyClick = (vacancy) => {
    if (selectedVacancy === vacancy) {
      setSelectedVacancy(null)
    } else {
      setSelectedVacancy(vacancy)
    }
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