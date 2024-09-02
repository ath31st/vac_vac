import React, { useState } from 'react';
import styled from 'styled-components';
// @ts-expect-error TS(6142): Module './button/SubmitButton' was resolved to '/h... Remove this comment to see the full error message
import SubmitButton from './button/SubmitButton';
// @ts-expect-error TS(6142): Module './message/ErrorMessage' was resolved to '/... Remove this comment to see the full error message
import ErrorMessage from './message/ErrorMessage';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding: 20px;
  border-left: 1px solid #ccc;
  width: 50%;
`;

const VacancyTitle = styled.h2`
  margin: 0 0 20px;
`;

const VacancyDescription = styled.p`
  background-color: #e0e0e0;
  padding: 20px;
  margin: 0 0 20px;
`;

const Tags = styled.div`
  margin: 20px 0;
`;

const Tag = styled.span`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const EnglishGradeLvls = styled.p`
  padding-left: 20px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const VacancyDetails = ({
  vacancy,
  onVacancyChange
}: any) => {
  const [error, setError] = useState('');
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const role = useSelector((state) => state.auth.user?.role);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userId = useSelector((state) => state.auth.user?.user_id);

  const handleResponseVacancy = async (vacancyId: any) => {
    try {
      const endpoint = `/api/v1/vacancies/${vacancyId}/response`;
      await axios.post(endpoint);
      onVacancyChange({ ...vacancy, hasResponded: true });
    } catch (error) {
      console.log(error);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 409) {
        setError('You have already responded to this vacancy');
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setError(error.response.data);
      }
    }
  };

  const handleCancelResponseVacancy = async (vacancyId: any) => {
    try {
      const endpoint = `/api/v1/vacancies/${vacancyId}/cancel-response`;
      await axios.delete(endpoint);
      onVacancyChange({ ...vacancy, hasResponded: false });
    } catch (error) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 404) {
        setError('No response has been found for this vacancy');
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setError(error.response.data);
      }
    }
  };

  const handleChangeVisibleVacancy = async (vacancy: any) => {
    try {
      const isVisible = !vacancy.isVisible;
      const endpoint = `/api/v1/vacancies/${vacancy.id}/change-visible`;
      await axios.put(endpoint, { isVisible: isVisible });
      onVacancyChange({ ...vacancy, isVisible: isVisible });
    } catch (error) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (error.response && error.response.status === 404) {
        setError('Vacancy not found');
      } else {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        setError(error.response.data);
      }
    }
  };

  const isUserCreator = vacancy.creatorId === userId;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <VacancyTitle>{vacancy.title}</VacancyTitle>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <EnglishGradeLvls>English lvl: {vacancy.englishLevel}</EnglishGradeLvls>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <EnglishGradeLvls>Grade: {vacancy.grade}</EnglishGradeLvls>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <VacancyDescription>{vacancy.description}</VacancyDescription>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h3>Contacts</h3>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Tags>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {vacancy.tags.map((tag: any) => <Tag key={tag.id}>{tag.name}</Tag>)}
      </Tags>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {error && <ErrorMessage>{error}</ErrorMessage>}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ButtonContainer>
        {role === 1 && isUserCreator ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SubmitButton
            type="button"
            onClick={() => handleChangeVisibleVacancy(vacancy)}
          >
            {vacancy.isVisible ? 'Close vacancy' : 'Open vacancy'}
          </SubmitButton>
        ) : role !== 1 ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            {vacancy.hasResponded ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <SubmitButton
                type="button"
                onClick={() => handleCancelResponseVacancy(vacancy.id)}
              >
                Cancel response
              </SubmitButton>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <SubmitButton
                type="button"
                onClick={() => handleResponseVacancy(vacancy.id)}
              >
                Response to vacancy
              </SubmitButton>
            )}
          </>
        ) : null}
      </ButtonContainer>
    </Container>
  );
};

export default VacancyDetails;
