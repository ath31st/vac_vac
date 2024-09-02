import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <FooterContainer>&copy; Vac Vac project 2024</FooterContainer>;
};

export default Footer;
