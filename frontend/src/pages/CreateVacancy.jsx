import React, { useState } from 'react'
import styled from 'styled-components'
import InputField from '../components/input/InputField'
import SelectField from '../components/select/SelectField'
import SubmitButton from '../components/button/SubmitButton'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
`

const FormContainer = styled.div`
    padding: 20px;
    width: 600px;
`

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`

const Label = styled.label`
    margin-bottom: 5px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    button {
        margin-left: 10px;
    }
`

const CreateVacancy = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    englishLevel: '',
    grade: '',
    tags: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // Implement save functionality
  }

  const handleClose = () => {
    navigate('/vacancies')
  }

  const englishLevelOptions = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ]

  const gradeOptions = [
    { id: 'junior', name: 'Junior' },
    { id: 'mid', name: 'Mid' },
    { id: 'senior', name: 'Senior' },
  ]

  return (
    <Container>
      <Sidebar/>
      <FormContainer>
        <Title>Create Vacancy</Title>
        <FieldContainer>
          <Label htmlFor="title">Vacancy Title</Label>
          <InputField
            type="text"
            name="title"
            placeholder="Vacancy Title"
            value={formData.title}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="description">Vacancy Description</Label>
          <InputField
            type="text"
            name="description"
            placeholder="Vacancy Description"
            value={formData.description}
            onChange={handleChange}
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="englishLevel">English Level</Label>
          <SelectField
            name="englishLevel"
            value={formData.englishLevel}
            onChange={handleChange}
            options={englishLevelOptions}
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="grade">Grade</Label>
          <SelectField
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            options={gradeOptions}
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="tags">Tags</Label>
          <InputField
            type="text"
            name="tags"
            placeholder="Tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </FieldContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleClose}>Close</SubmitButton>
          <SubmitButton onClick={handleSave}>Save</SubmitButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  )
}

export default CreateVacancy
