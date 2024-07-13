import { Sequelize } from "sequelize";
import config from "../Config";

const database = new Sequelize({
  username: config.USERNAME,
  password: config.PASSWORD,
  host: config.DATABASEHOST,
  dialect: "mysql",
  port: config.DatabaseportPORT,
});

export default database;
