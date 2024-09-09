import styled from 'styled-components';

const ResponseSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  width: 100px;
  text-align: right;
`;

export default ResponseSpan;
