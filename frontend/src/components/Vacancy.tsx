import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 600px;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

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

const ClosedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  pointer-events: none;
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
    <Container onClick={onClick}>
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
    </Container>
  );
};

export default Vacancy;
