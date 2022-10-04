import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      mainBackground: string;
      primaryText: string;
      secondaryText: string;
      disable: string;
      border: string;
      divider: string;
      background: string;
      backgroundSub: string;
      tableHeader: string;
      themeIcon: string;
      searchBar: string;
      // button-color
      defaultButtonColor: string;
      defaultButtonBackground: string;
      // point-color
      hover: string;
      hoverBackground: string;
      [key: string]: any;
      // TODO: 객체에 string 으로 접근 시 에러 방지를 위한 조치
    };
    fontSizes: {
      xsm: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      [key: string]: any;
    };
    fontWeights: {
      extraBold: number;
      bold: number;
      semiBold: number;
      regular: number;
      [key: string]: any;
    };
  }
}
