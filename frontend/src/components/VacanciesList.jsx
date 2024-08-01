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

  const fetchVacancyDetails = async (vacancyId) => {
    try {
      const response = await axios.get(`/api/v1/vacancies/${vacancyId}`)
      setSelectedVacancy(response.data)
    } catch (error) {
      console.error('Error fetching Vacancy Details:', error)
    }
  }

  const handleVacancyClick = (vacancyId) => {
    if (selectedVacancy && selectedVacancy.id === vacancyId) {
      setSelectedVacancy(null)
    } else {
      fetchVacancyDetails(vacancyId)
    }
  }

  const removeVacancy = (vacancyId) => {
    setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancyId))
    setSelectedVacancy(null)
  }

  return (
    <>
      <VacanciesContainer>
        {vacancies.map((vacancy) => (
          <Vacancy
            key={vacancy.id}
            title={vacancy.title}
            description={vacancy.description}
            onClick={() => handleVacancyClick(vacancy.id)}
          />
        ))}
      </VacanciesContainer>
      {selectedVacancy && <VacancyDetails
        vacancy={selectedVacancy}
        onRemoveVacancy={removeVacancy}/>}
    </>
  )
}

export default VacanciesList
