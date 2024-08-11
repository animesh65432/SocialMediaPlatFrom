import { configureStore, Middleware } from "@reduxjs/toolkit";
import user from "./slices/UserSlices";
import posts from "./slices/PostSlices";
import socket from "./slices/SocketSlices";
import RoomReducer from "./slices/Room";
import color from "./slices/Color";

const customMiddleware: Middleware = (store) => (next) => (action) => {
  return next(action);
};

const store = configureStore({
  reducer: {
    user,
    posts,
    socket,
    Room: RoomReducer,
    color,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
