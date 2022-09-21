export interface Id {
  kakaoId?: string;
}

export interface NewUser {
  userCode: string;
  userState: string;
  nickname: string;
  profileImg: string;
  userRole: string;
  kakaoEmail?: string;
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
  userState: boolean;
}

export interface DebateList {
  discussionCode: number;
  nickname: number;
  discussionTitle: string;
  discussionContents: string;
  discussionTag: string;
  discussionLikes: number;
  profileImg: string;
}
