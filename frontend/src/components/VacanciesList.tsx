import styled from 'styled-components';
// @ts-expect-error TS(6142): Module '../components/Vacancy' was resolved to '/h... Remove this comment to see the full error message
import Vacancy from '../components/Vacancy';
import { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
// @ts-expect-error TS(6142): Module '../components/VacancyDetails' was resolved... Remove this comment to see the full error message
import VacancyDetails from '../components/VacancyDetails';
import { useSelector } from 'react-redux';

const VacanciesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const VacanciesList = ({
  endpoint
}: any) => {
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const role = useSelector((state) => state.auth.user?.role);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userId = useSelector((state) => state.auth.user?.user_id);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(endpoint);
        setVacancies(response.data);

        setTimeout(() => {
          if (role === 0) {
            fetchResponseStatuses(response.data.map((vacancy: any) => vacancy.id));
          } else if (role === 1) {
            fetchResponseCounts(
              response.data
                .filter((vacancy: any) => vacancy.creatorId === userId)
                .map((vacancy: any) => vacancy.id)
            );
          }
        }, 200);
      } catch (error) {
        console.error('Error fetching Vacancies:', error);
      }
    };

    fetchVacancies();
  }, [endpoint, role, userId]);

  const fetchResponseStatuses = async (vacancyIds: any) => {
    try {
      const response = await axios.post(
        '/api/v1/vacancies/response-statuses',
        vacancyIds
      );
      const statuses = response.data;

      // @ts-expect-error TS(2345): Argument of type '(prevVacancies: never[]) => any[... Remove this comment to see the full error message
      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
          ...vacancy,
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          hasResponded: statuses[vacancy.id] || false,
        }))
      );
    } catch (error) {
      console.error('Error fetching response statuses:', error);
    }
  };

  const fetchResponseCounts = async (vacancyIds: any) => {
    try {
      const response = await axios.post(
        '/api/v1/vacancies/response-counts',
        vacancyIds
      );
      const counts = response.data;

      // @ts-expect-error TS(2345): Argument of type '(prevVacancies: never[]) => any[... Remove this comment to see the full error message
      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
          ...vacancy,
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          responseCount: counts[vacancy.id] || 0,
        }))
      );
    } catch (error) {
      console.error('Error fetching response counts:', error);
    }
  };

  const fetchVacancyDetails = async (vacancyId: any) => {
    try {
      const response = await axios.get(`/api/v1/vacancies/${vacancyId}`);
      const vacancyDetails = response.data;

      if (role === 0) {
        const statusResponse = await axios.post(
          '/api/v1/vacancies/response-statuses',
          [vacancyId]
        );
        const hasResponded = statusResponse.data[vacancyId] || false;

        setSelectedVacancy({
          ...vacancyDetails,
          hasResponded,
        });
      } else {
        setSelectedVacancy(vacancyDetails);
      }
    } catch (error) {
      console.error('Error fetching Vacancy Details:', error);
    }
  };

  const handleVacancyClick = (vacancyId: any) => {
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    if (selectedVacancy && selectedVacancy.id === vacancyId) {
      setSelectedVacancy(null);
    } else {
      fetchVacancyDetails(vacancyId);
    }
  };

  const removeVacancy = (vacancyId: any) => {
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    setVacancies(vacancies.filter((vacancy) => vacancy.id !== vacancyId));
    setSelectedVacancy(null);
  };

  const handleVacancyChange = (updatedVacancy: any) => {
    // @ts-expect-error TS(2345): Argument of type '(prevVacancies: never[]) => any[... Remove this comment to see the full error message
    setVacancies((prevVacancies) =>
      prevVacancies.map((vacancy) =>
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        vacancy.id === updatedVacancy.id ? updatedVacancy : vacancy
      )
    );
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <VacanciesContainer>
        {vacancies.map((vacancy) => (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Vacancy
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            key={vacancy.id}
            // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
            title={vacancy.title}
            // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            description={vacancy.description}
            // @ts-expect-error TS(2339): Property 'isVisible' does not exist on type 'never... Remove this comment to see the full error message
            isVisible={vacancy.isVisible}
            // @ts-expect-error TS(2339): Property 'hasResponded' does not exist on type 'ne... Remove this comment to see the full error message
            hasResponded={role === 0 ? vacancy.hasResponded : null}
            responseCount={
              // @ts-expect-error TS(2339): Property 'creatorId' does not exist on type 'never... Remove this comment to see the full error message
              role === 1 && vacancy.creatorId === userId
                // @ts-expect-error TS(2339): Property 'responseCount' does not exist on type 'n... Remove this comment to see the full error message
                ? vacancy.responseCount
                : null
            }
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            onClick={() => handleVacancyClick(vacancy.id)}
          />
        ))}
      </VacanciesContainer>
      {selectedVacancy && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <VacancyDetails
          vacancy={selectedVacancy}
          onRemoveVacancy={removeVacancy}
          onVacancyChange={handleVacancyChange}
        />
      )}
    </>
  );
};

export default VacanciesList;
