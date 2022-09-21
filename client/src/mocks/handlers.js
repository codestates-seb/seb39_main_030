import { rest } from 'msw';
import { mockUser } from './mockUser';
import { mockDebateList } from './mockDebateList';
// Create a "handler" with an user model and some defaults

export const handlers = [
  rest.get('/user/oauth/token', (req, res, ctx) => {
    mockUser[0].userState = 'Y';
    return res(ctx.status(200), ctx.json(mockUser[0]));
  }),

  rest.get('/user/logout', (req, res, ctx) => {
    mockUser[0].userState = 'N';
    return res(ctx.status(200), ctx.json('N'));
  }),

  rest.get('/discussion', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDebateList));
  }),
];
