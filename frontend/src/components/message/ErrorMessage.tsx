import styled from 'styled-components';

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
const ErrorMessage = ({
  children
}: any) => {
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

export default ErrorMessage;
