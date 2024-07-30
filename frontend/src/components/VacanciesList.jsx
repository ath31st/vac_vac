import styled from 'styled-components'
import Vacancy from '../components/Vacancy'
import { useEffect, useState } from 'react'
import axios from '../config/axiosConfig'
import VacancyDetails from '../components/VacancyDetails'

const VacanciesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`

const VacanciesList = ({ endpoint }) => {
  const [selectedVacancy, setSelectedVacancy] = useState(null)
  const [vacancies, setVacancies] = useState([])

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(endpoint)
        setVacancies(response.data)
      } catch (error) {
        console.error('Error fetching Vacancies:', error)
      }
    }

    fetchVacancies()
  }, [endpoint])

  const handleVacancyClick = (vacancy) => {
    if (selectedVacancy === vacancy) {
      setSelectedVacancy(null)
    } else {
      setSelectedVacancy(vacancy)
    }
  }

  return (
    <>
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
    </>
  )
}

export default VacanciesList
