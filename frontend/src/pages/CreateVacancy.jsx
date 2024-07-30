import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputField from '../components/input/InputField'
import SelectField from '../components/select/SelectField'
import SubmitButton from '../components/button/SubmitButton'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig'
import MultiSelectField from '../components/select/MultiSelectField'
import ErrorMessage from '../components/message/ErrorMessage'

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
    tags: [],
  })

  const [englishLevelOptions, setEnglishLevelOptions] = useState([])
  const [gradeOptions, setGradeOptions] = useState([])
  const [tagsOptions, setTagsOptions] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    try {
      await axios.post(`/api/v1/vacancies`, formData)
      navigate('/vacancies')
    } catch (error) {
      console.error('Error during creation vacancy:', error)
      if (error.response && error.response.data) {
        setError(`Creation vacancy failed with cause: ${error.response.data}.`)
      } else {
        setError(`Creation vacancy failed. Please try again.`)
      }
    }
  }

  const handleClose = () => {
    navigate('/vacancies')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [englishLevelsResponse, gradesResponse, tagsResponse] = await Promise.all(
          [
            axios.get(`/api/v1/vacancies/english-levels`),
            axios.get(`/api/v1/vacancies/education-levels`),
            axios.get(`/api/v1/vacancies/tags`),
          ])

        setEnglishLevelOptions(englishLevelsResponse.data)
        setGradeOptions(gradesResponse.data)
        setTagsOptions(
          tagsResponse.data.map(tag => ({ label: tag.name, value: tag.id })))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Sidebar/>
      <FormContainer>
        <Title>Create Vacancy</Title>
        <FieldContainer>
          <Label htmlFor="title">Vacancy Title</Label>
          <InputField
            id="title"
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
            id="description"
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
            id="englishLevel"
            name="englishLevel"
            value={formData.englishLevel}
            onChange={handleChange}
            options={englishLevelOptions}
            placeholder="Select an english level"
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="grade">Grade</Label>
          <SelectField
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            options={gradeOptions}
            placeholder="Select a grade"
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="tags">Tags</Label>
          <MultiSelectField
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            options={tagsOptions}
            placeholder="Select tags"
          />
        </FieldContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <SubmitButton onClick={handleClose}>Close</SubmitButton>
          <SubmitButton onClick={handleSave}>Save</SubmitButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  )
}

export default CreateVacancy
