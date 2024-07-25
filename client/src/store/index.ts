import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/UserSlices";
import posts from "./slices/PostSlices";

const store = configureStore({
  reducer: {
    user,
    posts,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
