import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/UserSlices";
import posts from "./slices/PostSlices";
import socket from "./slices/SocketSlices";

const store = configureStore({
  reducer: {
    user,
    posts,
    socket,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
