import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const VacancyTitle = styled.h3`
    margin: 0;
`

const VacancyDescription = styled.p`
    margin: 0;
`

const ResponseStatus = styled.span`
    color: green;
`

const Vacancy = ({ title, description, onClick }) => {
  return (
    <Container onClick={onClick}>
      <div>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyDescription>{description}</VacancyDescription>
      </div>
      <ResponseStatus>✔ You responded</ResponseStatus>
    </Container>
  )
}

export default Vacancy
