import config from "./Config";
import express from "express";
import database from "./db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
