import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/UserSlices";
import posts from "./slices/PostSlices";
import Friend from "./slices/FriendSlices";

const store = configureStore({
  reducer: {
    user,
    posts,
    Friend,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
