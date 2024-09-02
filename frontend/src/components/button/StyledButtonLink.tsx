import styled from 'styled-components';
// @ts-expect-error TS(6142): Module '../link/StyledLink' was resolved to '/home... Remove this comment to see the full error message
import StyledLink from '../link/StyledLink';

const StyledButtonLink = styled(StyledLink).attrs({
  as: 'div',
})`
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: silver;
    color: white;
  }
`;

export default StyledButtonLink;
