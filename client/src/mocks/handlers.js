import { rest } from 'msw';
import { mockUser } from './data/mockUser';
import { mockDebateList } from './data/mockDebateList';
import { mockCommentList } from './data/mockComment';
import { mockGuestbook } from './data/mockGuestbook';
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
    return res(ctx.status(200), ctx.json({ data: mockDebateList }));
  }),

  rest.post('/discussion', async (req, res, ctx) => {
    const debate = await req.json();
    console.log(debate);
    mockDebateList.unshift({
      ...mockDebateList[0],
      ...debate,
      discussionCode: mockDebateList.length + 1,
    });
    return res(ctx.status(200), ctx.json(mockDebateList));
  }),

  rest.get('/discussion/detail/:discussionCode', async (req, res, ctx) => {
    const discussionCode = Number(req.params.discussionCode);
    const discussion = mockDebateList.filter(
      (el) => el.discussionCode === discussionCode
    )[0];
    const resData = [
      {
        discussionCode: discussion.discussionCode,
        userCode: discussion.userCode,
        createTime: discussion.discussionCreateDate,
        title: discussion.discussionTitle,
        contents: discussion.discussionContents,
        category: discussion.discussionCategory,
        tag: discussion.discussionTag,
        likes: discussion.discussionLikes,
        userInfo: {
          userState: discussion.userState,
          nickname: discussion.nickname,
          profileImg: discussion.profileImg,
        },
      },
      mockCommentList,
    ];
    return res(ctx.status(200), ctx.json(resData));
  }),
  rest.get('/guestbook', (req, res, ctx) => {
    console.log(req.url.searchParams.get('userCode'));
    return res(ctx.status(200), ctx.json(mockGuestbook));
  }),
];
