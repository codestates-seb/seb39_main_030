export interface Id {
  id: number;
}

export interface NewUser {
  nickname?: string;
  token: string;
  image?: string;
}

export type User = Id & NewUser;
