import styled from 'styled-components'

const StyledErrorMessage = styled.p`
    color: red;
    font-size: 14px;
`
const ErrorMessage = ({ children }) => {
  return (
    <StyledErrorMessage>{children}</StyledErrorMessage>
  )
}

export default ErrorMessage