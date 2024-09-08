import React from 'react';
import styled from 'styled-components';
import ClosedOverlay from './overlay/ClosedOverlay';
import VacancyContainer from './container/VacancyContainer';

const VacancyTitle = styled.h3`
  margin: 0;
`;

const VacancyDescription = styled.p`
  margin: 0;
`;

const ResponseStatus = styled.span`
  color: green;
  width: 100px;
  text-align: right;
`;

const ResponseCount = styled.span`
  color: blue;
  width: 100px;
  text-align: right;
`;

interface VacancyProps {
  title: string;
  description: string;
  hasResponded?: boolean;
  responseCount?: number | null;
  isVisible: boolean;
  onClick: () => void;
}

const Vacancy: React.FC<VacancyProps> = ({
  title,
  description,
  hasResponded,
  responseCount,
  isVisible,
  onClick,
}) => {
  return (
    <VacancyContainer onClick={onClick}>
      {!isVisible && <ClosedOverlay>Closed</ClosedOverlay>}
      <div>
        <VacancyTitle>{title}</VacancyTitle>
        <VacancyDescription>{description}</VacancyDescription>
      </div>
      {hasResponded !== undefined && (
        <ResponseStatus>
          {hasResponded ? '✔ You responded' : '❌ Not responded'}
        </ResponseStatus>
      )}
      {responseCount !== null && responseCount !== undefined && (
        <ResponseCount>{responseCount} responses</ResponseCount>
      )}
    </VacancyContainer>
  );
};

export default Vacancy;
