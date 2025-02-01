export type createroomtypes = { Name: string; Topics: string; token: string };
export type joinedtheroomtypes = {
  userId: number;
  roomId: string;
  peerId: string;
};
export type JwtPayload = {
  Email: string;
};

export type removeroomtypes = {
  roomId: string
  userId: number,
  peerId: string,
};