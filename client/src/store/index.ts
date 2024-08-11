import { configureStore, Middleware } from "@reduxjs/toolkit";
import user from "./slices/UserSlices";
import posts from "./slices/PostSlices";
import socket from "./slices/SocketSlices";

const customMiddleware: Middleware = (store) => (next) => (action) => {
  return next(action);
};

const store = configureStore({
  reducer: {
    user,
    posts,
    socket,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
