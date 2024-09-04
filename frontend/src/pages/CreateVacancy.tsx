import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from '../components/input/InputField';
import SelectField from '../components/select/SelectField';
import SubmitButton from '../components/button/SubmitButton';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import MultiSelectField from '../components/select/MultiSelectField';
import ErrorMessage from '../components/message/ErrorMessage';
import { EnglishGradeLvlsType, GradeType, Option, TagType } from '../types';

const Container = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  padding: 20px;
  width: 600px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    margin-left: 10px;
  }
`;

interface FormData {
  title: string;
  description: string;
  englishLevel: string;
  grade: string;
  tags: string[];
}

const CreateVacancy: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    englishLevel: '',
    grade: '',
    tags: [],
  });

  const [englishLevelOptions, setEnglishLevelOptions] = useState<Option[]>([]);
  const [gradeOptions, setGradeOptions] = useState<Option[]>([]);
  const [tagsOptions, setTagsOptions] = useState<Option[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const tags = formData.tags.map((id) => parseInt(id));
      const dataToSend = {
        ...formData,
        tags,
      };
      await axios.post('/api/v1/vacancies', dataToSend);
      navigate('/vacancies');
    } catch (error: unknown) {
      console.error('Error during creation vacancy:', error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(`Creation vacancy failed with cause: ${error.response.data}.`);
      } else {
        setError('Creation vacancy failed. Please try again.');
      }
    }
  };

  const handleClose = () => {
    navigate('/vacancies');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [englishLevelsResponse, gradesResponse, tagsResponse] =
          await Promise.all([
            axios.get('/api/v1/vacancies/english-levels'),
            axios.get('/api/v1/vacancies/education-levels'),
            axios.get('/api/v1/vacancies/tags'),
          ]);

        setEnglishLevelOptions(
          englishLevelsResponse.data.map((item: EnglishGradeLvlsType) => ({
            label: item.name,
            value: item.id.toString(),
          }))
        );
        setGradeOptions(
          gradesResponse.data.map((item: GradeType) => ({
            label: item.name,
            value: item.id.toString(),
          }))
        );
        setTagsOptions(
          tagsResponse.data.map((tag: TagType) => ({
            label: tag.name,
            value: tag.id.toString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <FormContainer>
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
            placeholder="Select an English level"
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
            onChange={(event) =>
              setFormData({ ...formData, tags: event.target.value })
            }
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
  );
};

export default CreateVacancy;
