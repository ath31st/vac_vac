import styled from 'styled-components';

const VacancyContainer = styled.div`
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

export default VacancyContainer;
