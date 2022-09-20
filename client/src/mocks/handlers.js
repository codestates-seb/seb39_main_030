import { rest } from 'msw';

export const mockUser = [
  {
    kakaoEmail: null,
    kakaoId: 321312453243,
    nickname: '지영준',
    profileImg:
      'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
    userCode: 1,
    userRole: 'ROLE_USER',
    userState: 'N',
  },
];

// Create a "handler" with an user model and some defaults

export const handlers = [
  rest.get('/user/oauth/token', (req, res, ctx) => {
    mockUser[0].userState = 'Y';
    return res(ctx.status(200), ctx.json(mockUser[0]));
  }),

  rest.get('user/logout', (req, res, ctx) => {
    mockUser[0].userState = 'N';
    return res(ctx.status(200), ctx.json('N'));
  }),
];
