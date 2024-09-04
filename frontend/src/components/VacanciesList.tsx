import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../config/axiosConfig';
import Vacancy from '../components/Vacancy';
import VacancyDetails from '../components/VacancyDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { VacancyData } from '../types';

const VacanciesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

interface VacanciesListProps {
  endpoint: string;
}

const VacanciesList: React.FC<VacanciesListProps> = ({ endpoint }) => {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyData | null>(
    null
  );
  const [vacancies, setVacancies] = useState<VacancyData[]>([]);
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const userId = useSelector((state: RootState) => state.auth.user?.user_id);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get<VacancyData[]>(endpoint);
        const fetchedVacancies = response.data;
        setVacancies(fetchedVacancies);

        setTimeout(() => {
          if (role === 0) {
            fetchResponseStatuses(
              fetchedVacancies.map((vacancy) => vacancy.id)
            );
          } else if (role === 1) {
            fetchResponseCounts(
              fetchedVacancies
                .filter((vacancy) => vacancy.creatorId === userId)
                .map((vacancy) => vacancy.id)
            );
          }
        }, 200);
      } catch (error) {
        console.error('Error fetching Vacancies:', error);
      }
    };

    fetchVacancies();
  }, [endpoint, role, userId]);

  const fetchResponseStatuses = async (vacancyIds: string[]) => {
    try {
      const response = await axios.post<{ [key: string]: boolean }>(
        '/api/v1/vacancies/response-statuses',
        vacancyIds
      );
      const statuses = response.data;

      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          ...vacancy,
          hasResponded: statuses[vacancy.id] || false,
        }))
      );
    } catch (error) {
      console.error('Error fetching response statuses:', error);
    }
  };

  const fetchResponseCounts = async (vacancyIds: string[]) => {
    try {
      const response = await axios.post<{ [key: string]: number }>(
        '/api/v1/vacancies/response-counts',
        vacancyIds
      );
      const counts = response.data;

      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => ({
          ...vacancy,
          responseCount: counts[vacancy.id] || 0,
        }))
      );
    } catch (error) {
      console.error('Error fetching response counts:', error);
    }
  };

  const fetchVacancyDetails = async (vacancyId: string) => {
    try {
      const response = await axios.get<VacancyData>(
        `/api/v1/vacancies/${vacancyId}`
      );
      const vacancyDetails = response.data;

      if (role === 0) {
        const statusResponse = await axios.post<{ [key: string]: boolean }>(
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

  const handleVacancyClick = (vacancyId: string) => {
    if (selectedVacancy && selectedVacancy.id === vacancyId) {
      setSelectedVacancy(null);
    } else {
      fetchVacancyDetails(vacancyId);
    }
  };

  const removeVacancy = (vacancyId: string) => {
    setVacancies(vacancies.filter((vacancy) => vacancy.id !== vacancyId));
    setSelectedVacancy(null);
  };

  const handleVacancyChange = (updatedVacancy: VacancyData) => {
    setVacancies((prevVacancies) =>
      prevVacancies.map((vacancy) =>
        vacancy.id === updatedVacancy.id ? updatedVacancy : vacancy
      )
    );
  };

  return (
    <VacanciesContainer>
      {vacancies.map((vacancy) => (
        <Vacancy
          key={vacancy.id}
          title={vacancy.title}
          description={vacancy.description}
          isVisible={vacancy.isVisible}
          hasResponded={role === 0 ? vacancy.hasResponded : undefined}
          responseCount={
            role === 1 && vacancy.creatorId === userId
              ? vacancy.responseCount
              : undefined
          }
          onClick={() => handleVacancyClick(vacancy.id)}
        />
      ))}
      {selectedVacancy && (
        <VacancyDetails
          vacancy={selectedVacancy}
          onRemoveVacancy={removeVacancy}
          onVacancyChange={handleVacancyChange}
        />
      )}
    </VacanciesContainer>
  );
};

export default VacanciesList;
