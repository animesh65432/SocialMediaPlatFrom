import { Sequelize } from "sequelize";
import config from "../Config";

const database = new Sequelize(
  config.DATABASENAME as string,
  config.USERNAME as string,
  config.PASSWORD as string,
  {
    host: config.DATABASEHOST,
    dialect: "mysql",
    port: config.DatabaseportPORT,
  }
);

export default database;
