import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
  ${reset}
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }
  
  body {
    font-family: sans-serif;
    background: ${({ theme }) => theme.mode.mainBackground};
    transition: all 0.2s;
  }
`;

export default GlobalStyled;
