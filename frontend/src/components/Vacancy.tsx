import React from 'react';
import ClosedOverlay from './overlay/ClosedOverlay';
import VacancyContainer from './container/VacancyContainer';
import ResponseSpan from './span/ResponseSpan';

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
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {hasResponded !== undefined && (
        <ResponseSpan color="green">
          {hasResponded ? '✔ You responded' : '❌ Not responded'}
        </ResponseSpan>
      )}
      {responseCount !== null && responseCount !== undefined && (
        <ResponseSpan color="blue">{responseCount} responses</ResponseSpan>
      )}
    </VacancyContainer>
  );
};

export default Vacancy;
