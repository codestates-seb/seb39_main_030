import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
  ${reset}
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Apple SD Gothic Neo','Malgun Gothic',arial,sans-serif;
    -webkit-user-drag: none;
  }
  html::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  
  body {
    font-family: 'Apple SD Gothic Neo','Malgun Gothic',arial,sans-serif;
    background: ${({ theme }) => theme.mode.mainBackground};
    transition: all 0.2s;
  }
`;

export default GlobalStyled;
