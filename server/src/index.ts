import config from "./Config";
import express from "express";
import database from "./db";
import { UserRouter, forgetPasswordrouter } from "./router";
import cookieParser from "cookie-parser";
import { Users, ForgetPassword } from "./Models";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);
app.use("/forget", forgetPasswordrouter);

Users.hasMany(ForgetPassword);
ForgetPassword.belongsTo(Users);

database
  .sync()
  .then((res) => {
    app.listen(config.PORT || 4000, () => {
      console.log(`server start at the ${config.PORT}`);
    });
  })
  .catch((errors) => {
    console.log(errors);
  });
