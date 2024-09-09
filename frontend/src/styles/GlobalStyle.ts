import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
    }

    body {
        min-height: 100vh;
        background: radial-gradient(#b7b7b7, #484848);
        display: grid;
    }
`;

export default GlobalStyle;
