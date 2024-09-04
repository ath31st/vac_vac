import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
