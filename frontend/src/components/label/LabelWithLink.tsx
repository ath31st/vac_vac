import styled from 'styled-components';

const LabelWithLink = styled.label`
  font-size: 14px;
  color: #333;
  margin-top: 10px;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LabelWithLink;
