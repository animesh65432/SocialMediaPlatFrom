import { Sequelize } from "sequelize";
import config from "../Config";

const database = new Sequelize(
  config.DATABASENAME as string,
  config.USERNAME as string,
  config.PASSWORD as string,
  {
    host: config.DATABASEHOST as string,
    port: 15391,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default database;
