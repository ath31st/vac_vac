import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 16px;
  width: 160px;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  color: #333;
  background-color: #ccc;
  border: 2px solid white;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: silver;
    color: white;
  }
`;

const SubmitButton = ({
  type,
  onClick,
  children
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SubmitButton;
