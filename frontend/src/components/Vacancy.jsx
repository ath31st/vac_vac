import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
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

const ResponseCount = styled.span`
    color: blue;
`

const Vacancy = ({
  title,
  description,
  hasResponded,
  responseCount,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <div>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyDescription>{description}</VacancyDescription>
      </div>
      {hasResponded && (
        <ResponseStatus>
          {hasResponded ? '✔ You responded' : '❌ Not responded'}
        </ResponseStatus>
      )}
      {responseCount && (
        <ResponseCount>
          {responseCount} responses
        </ResponseCount>
      )}
    </Container>
  )
}

export default Vacancy
