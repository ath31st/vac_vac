import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// @ts-expect-error TS(6142): Module '../components/input/InputField' was resolv... Remove this comment to see the full error message
import InputField from '../components/input/InputField';
// @ts-expect-error TS(6142): Module '../components/select/SelectField' was reso... Remove this comment to see the full error message
import SelectField from '../components/select/SelectField';
// @ts-expect-error TS(6142): Module '../components/button/SubmitButton' was res... Remove this comment to see the full error message
import SubmitButton from '../components/button/SubmitButton';
// @ts-expect-error TS(6142): Module '../components/Sidebar' was resolved to '/h... Remove this comment to see the full error message
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
// @ts-expect-error TS(6142): Module '../components/select/MultiSelectField' was... Remove this comment to see the full error message
import MultiSelectField from '../components/select/MultiSelectField';
// @ts-expect-error TS(6142): Module '../components/message/ErrorMessage' was re... Remove this comment to see the full error message
import ErrorMessage from '../components/message/ErrorMessage';

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

const CreateVacancy = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    englishLevel: '',
    grade: '',
    tags: [],
  });

  const [englishLevelOptions, setEnglishLevelOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/v1/vacancies', formData);
      navigate('/vacancies');
    } catch (error) {
      console.error('Error during creation vacancy:', error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.data) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
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

        setEnglishLevelOptions(englishLevelsResponse.data);
        setGradeOptions(gradesResponse.data);
        setTagsOptions(
          tagsResponse.data.map((tag: any) => ({
            label: tag.name,
            value: tag.id
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Sidebar />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <FormContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Label htmlFor="title">Vacancy Title</Label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <InputField
            id="title"
            type="text"
            name="title"
            placeholder="Vacancy Title"
            value={formData.title}
            onChange={handleChange}
          />
        </FieldContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Label htmlFor="description">Vacancy Description</Label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <InputField
            id="description"
            type="text"
            name="description"
            placeholder="Vacancy Description"
            value={formData.description}
            onChange={handleChange}
          />
        </FieldContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Label htmlFor="englishLevel">English Level</Label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectField
            id="englishLevel"
            name="englishLevel"
            value={formData.englishLevel}
            onChange={handleChange}
            options={englishLevelOptions}
            placeholder="Select an english level"
          />
        </FieldContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Label htmlFor="grade">Grade</Label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectField
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            options={gradeOptions}
            placeholder="Select a grade"
          />
        </FieldContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Label htmlFor="tags">Tags</Label>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <MultiSelectField
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            options={tagsOptions}
            placeholder="Select tags"
          />
        </FieldContainer>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {error && <ErrorMessage>{error}</ErrorMessage>}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ButtonContainer>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SubmitButton onClick={handleClose}>Close</SubmitButton>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SubmitButton onClick={handleSave}>Save</SubmitButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default CreateVacancy;
