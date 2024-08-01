import React, { useState } from 'react'
import styled from 'styled-components'
import SubmitButton from './button/SubmitButton'
import ErrorMessage from './message/ErrorMessage'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Container = styled.div`
    padding: 20px;
    border-left: 1px solid #ccc;
    width: 50%;
`

const VacancyTitle = styled.h2`
    margin: 0 0 20px;
`

const VacancyDescription = styled.p`
    background-color: #e0e0e0;
    padding: 20px;
    margin: 0 0 20px;
`

const Tags = styled.div`
    margin: 20px 0;
`

const Tag = styled.span`
    display: inline-block;
    margin: 0 10px 10px 0;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`

const EnglishGradeLvls = styled.p`
    padding-left: 20px;
    margin: 10px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const VacancyDetails = ({ vacancy, onRemoveVacancy }) => {
  const [error, setError] = useState('')
  const role = useSelector(state => state.auth.user?.role)
  const userId = useSelector(state => state.auth.user?.user_id)

  const handleResponseVacancy = async (vacancyId) => {
    try {
      const endpoint = `/api/v1/vacancies/${vacancyId}/response`
      await axios.post(endpoint)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 409) {
        setError('Have you already responded to this vacancy')
      } else {
        setError(error.response.data)
      }
    }
  }

  const handleCancelResponseVacancy = async (vacancyId) => {
    try {
      const endpoint = `/api/v1/vacancies/${vacancyId}/cancel-response`
      await axios.delete(endpoint)
      onRemoveVacancy(vacancyId)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No response has been found for this vacancy')
      } else {
        setError(error.response.data)
      }
    }
  }

  const handleChangeVisibleVacancy = async (vacancy) => {
    try {
      const isVisible = !vacancy.isVisible
      const endpoint = `/api/v1/vacancies/${vacancy.id}/change-visible`
      await axios.put(endpoint, { isVisible: isVisible })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Vacancy no found')
      } else {
        setError(error.response.data)
      }
    }
  }

  const isUserCreator = vacancy.creatorId === userId

  return (
    <Container>
      <VacancyTitle>{vacancy.title}</VacancyTitle>
      <EnglishGradeLvls>English lvl: {vacancy.englishLevel}</EnglishGradeLvls>
      <EnglishGradeLvls>Grade: {vacancy.grade}</EnglishGradeLvls>
      <VacancyDescription>{vacancy.description}</VacancyDescription>
      <h3>Contacts</h3>
      <Tags>
        {vacancy.tags.map((tag) => (<Tag key={tag.id}>{tag.name}</Tag>))}
      </Tags>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonContainer>
        {role === 1 && isUserCreator ? (
          <SubmitButton type="button" onClick={() =>
            handleChangeVisibleVacancy(vacancy)}>
            {vacancy.isVisible ? 'Close vacancy' : 'Open vacancy'}
          </SubmitButton>
        ) : role !== 1 ? (
          <>
            <SubmitButton type="button" onClick={() =>
              handleResponseVacancy(vacancy.id)}>
              Response to vacancy
            </SubmitButton>
            <SubmitButton type="button" onClick={() =>
              handleCancelResponseVacancy(vacancy.id)}>
              Cancel response
            </SubmitButton>
          </>
        ) : null}
      </ButtonContainer>
    </Container>
  )
}

export default VacancyDetails
