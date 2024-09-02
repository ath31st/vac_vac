import React from 'react';
import styled from 'styled-components';
// @ts-expect-error TS(6142): Module '../components/Sidebar' was resolved to '/h... Remove this comment to see the full error message
import Sidebar from '../components/Sidebar';
// @ts-expect-error TS(6142): Module '../components/VacanciesList' was resolved ... Remove this comment to see the full error message
import VacanciesList from '../components/VacanciesList';

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
`;

const MyVacancies = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Sidebar />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MainContent>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <VacanciesList endpoint="/api/v1/vacancies/employee" />
      </MainContent>
    </Container>
  );
};

export default MyVacancies;
