export interface Id {
  kakaoId?: string;
}

export interface NewUser {
  userCode: number;
  userState: string;
  nickname: string;
  profileImg: string;
  userRole: string;
  kakaoEmail: string;
  socketId: string;
  temp: number;
}

export type User = Id & NewUser;

export interface Debate {
  discussionCode: number;
  nickname: number;
  discussionCreateDate: string;
  discussionTitle: string;
  discussionContents: string;
  discussionCategory: string;
  discussionTag: string;
  discussionLikes: number;
  profileImg: string;
  userState: string;
}

export interface AddDebate {
  userCode: number;
  discussionTitle: string;
  discussionContents: string;
  discussionCategory: string;
  discussionTag: string;
}

export interface DetailDebate {
  discussionCode: number;
  userCode: number;
  createTime: string;
  title: string;
  contents: string;
  category: string;
  tag: string;
  likes: number;
  userInfo: {
    userState: string;
    nickname: string;
    profileImg: string;
  };
}

export interface Comment {
  commentCode: number;
  userCode: number;
  nickname: string;
  profileImg: string;
  commentContents: string;
  commentCreateDate: string;
}

export interface GuestBook {
  bookCode: number;
  guestCode: number;
  contents: string;
  createDate: string;
  guestInfo: {
    userCode: number;
    nickname: string;
    profileImg: string;
  };
}

export interface UpdateDebate extends AddDebate {
  discussionCode: number;
}

export interface AddComment {
  userCode: number;
  discussionCode: number;
  commentContents: string;
}

export interface AddGuestBook {
  userCode: number;
  guestCode: number;
  guestbookContents: string;
}
