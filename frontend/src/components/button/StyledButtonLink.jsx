import styled from 'styled-components'
import StyledLink from '../link/StyledLink'

const StyledButtonLink = styled(StyledLink).attrs({
  as: 'div',
})`
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: silver;
        color: white;
    }
`

export default StyledButtonLink
