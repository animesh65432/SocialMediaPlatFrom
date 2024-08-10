export type createroomtypes = { Name: string; Topics: string; token: string };
export type joinedtheroomtypes = {
  token: string;
  roomid: string;
  peerid: string;
};
export type JwtPayload = {
  Email: string;
};
