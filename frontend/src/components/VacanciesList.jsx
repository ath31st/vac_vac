import styled from 'styled-components'
import Vacancy from '../components/Vacancy'
import { useEffect, useState } from 'react'
import axios from '../config/axiosConfig'
import VacancyDetails from '../components/VacancyDetails'
import { useSelector } from 'react-redux'

const VacanciesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`

const VacanciesList = ({ endpoint }) => {
  const [selectedVacancy, setSelectedVacancy] = useState(null)
  const [vacancies, setVacancies] = useState([])
  const role = useSelector(state => state.auth.user?.role)
  const userId = useSelector(state => state.auth.user?.user_id)

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(endpoint)
        setVacancies(response.data)

        setTimeout(() => {
          if (role === 0) {
            fetchResponseStatuses(response.data.map(vacancy => vacancy.id))
          } else if (role === 1) {
            fetchResponseCounts(
              response.data.filter(vacancy => vacancy.creatorId === userId)
              .map(vacancy => vacancy.id))
          }
        }, 200)
      } catch (error) {
        console.error('Error fetching Vacancies:', error)
      }
    }

    fetchVacancies()
  }, [endpoint, role, userId])

  const fetchResponseStatuses = async (vacancyIds) => {
    try {
      const response = await axios.post('/api/v1/vacancies/response-statuses',
        vacancyIds)
      const statuses = response.data

      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          ...vacancy,
          hasResponded: statuses[vacancy.id] || false,
        })),
      )
    } catch (error) {
      console.error('Error fetching response statuses:', error)
    }
  }

  const fetchResponseCounts = async (vacancyIds) => {
    try {
      const response = await axios.post('/api/v1/vacancies/response-counts',
        vacancyIds)
      const counts = response.data

      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          ...vacancy,
          responseCount: counts[vacancy.id] || 0,
        })),
      )
    } catch (error) {
      console.error('Error fetching response counts:', error)
    }
  }

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
            hasResponded={role === 0 ? vacancy.hasResponded : null}
            responseCount={role === 1 && vacancy.creatorId === userId
              ? vacancy.responseCount
              : null}
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
