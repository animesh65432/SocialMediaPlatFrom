import { configureStore } from "@reduxjs/toolkit";
import user, { Userstates } from "./slices/UserSlices";
import posts, { PostsState } from "./slices/PostSlices";
import socket, { socketslicestypes } from "./slices/SocketSlices";
import Room, { RoomState } from "./slices/Room";
import color, { ColorSlices } from "./slices/Color";

const store = configureStore<{
  user: Userstates;
  posts: PostsState;
  socket: socketslicestypes;
  color: ColorSlices;
  Room: RoomState;
}>({
  reducer: {
    user,
    posts,
    socket,
    color,
    Room,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
