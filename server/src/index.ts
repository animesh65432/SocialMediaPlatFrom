import config from "./Config";
import express from "express";
import database from "./db";
import http from "http";
import {
  UserRouter,
  forgetPasswordrouter,
  PostRouter,
  profilerouter,
} from "./router";
import cookieParser from "cookie-parser";
import { Users, ForgetPassword, Posts } from "./Models";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);
app.use("/forget", forgetPasswordrouter);
app.use("/post", PostRouter);
app.use("/profile", profilerouter);

Users.hasMany(ForgetPassword);
ForgetPassword.belongsTo(Users);
Users.hasMany(Posts);
Posts.belongsTo(Users);

database
  .sync()
  .then(() => {
    server.listen(config.PORT || 4000, () => {
      console.log(`Server started at port ${config.PORT || 4000}`);
    });
  })
  .catch((errors) => {
    console.error("Database sync error:", errors);
  });
