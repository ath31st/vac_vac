import React from 'react';
import { Outlet } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to '/ho... Remove this comment to see the full error message
import Header from '../components/Header';
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to '/ho... Remove this comment to see the full error message
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.main`
  padding: 20px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const Layout = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Container>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Outlet />
      </Container>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Footer />
    </>
  );
};

export default Layout;
