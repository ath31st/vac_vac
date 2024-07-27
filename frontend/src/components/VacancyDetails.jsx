import React from 'react'
import styled from 'styled-components'

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

const VacancyDetails = ({ vacancy }) => {
  return (
    <Container>
      <VacancyTitle>{vacancy.title}</VacancyTitle>
      <EnglishGradeLvls>English lvl: {vacancy.englishLevel}</EnglishGradeLvls>
      <EnglishGradeLvls>Grade: {vacancy.grade}</EnglishGradeLvls>
      <VacancyDescription>{vacancy.description}</VacancyDescription>
      <h3>Contacts</h3>
      <Tags>
        {vacancy.tags.map((tag, index) => (
          <Tag key={tag.id || index}>{tag}</Tag>
        ))}
      </Tags>
      <button>Cancel response</button>
    </Container>
  )
}

export default VacancyDetails
