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
