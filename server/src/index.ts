import config from "./Config";
import express from "express";
import database from "./db";
import { UserRouter } from "./router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
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
