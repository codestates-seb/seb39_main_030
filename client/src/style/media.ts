const customMediaQuery = (env: string): string => {
  switch (env) {
    case 'bigDesktop':
      return '@media (min-width: 1200px)';
    case 'desktop':
      return '@media (min-width: 992px) and (max-width: 1199px)';
    case 'tablet':
      return '@media (min-width: 768px) and (max-width: 991px)';
    case 'mobile':
      return '@media (min-width: 576px) and (max-width: 767px)';
    case 'smallMobile':
      return '@media (max-width: 575px)';

    default:
      return `@media (max-width: ${env})`;
  }
};

const media = {
  custom: customMediaQuery,
  bigDesktop: customMediaQuery('bigDesktop'),
  desktop: customMediaQuery('desktop'),
  tablet: customMediaQuery('tablet'),
  mobile: customMediaQuery('mobile'),
  smallMobile: customMediaQuery('smallMobile'),
};

export { media };

// 사용 예시
// ${media.bigDesktop} {
//   background: red;
// }
//
// ${media.desktop} {
//   background: #d06135;
// }
//
// ${media.tablet} {
//   background: #bdbd3a;
// }
//
// ${media.mobile} {
//   background: green;
// }
//
// ${media.smallMobile} {
//   background: blue;
// }
// ${media.custom("992px")} {
//   background: blue;
// }
