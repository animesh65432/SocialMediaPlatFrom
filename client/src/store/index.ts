import { configureStore } from "@reduxjs/toolkit";
import user, { Userstates } from "./slices/UserSlices";
import posts, { PostsState } from "./slices/PostSlices";
import Room, { RoomState } from "./slices/Room";
import color, { ColorSlices } from "./slices/Color";
import Peers, { PeerSliceState } from "./slices/PeerSlices"

const store = configureStore<{
  user: Userstates;
  posts: PostsState;
  color: ColorSlices;
  Room: RoomState;
  Peers: PeerSliceState
}>({
  reducer: {
    user,
    posts,
    color,
    Room,
    Peers
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
