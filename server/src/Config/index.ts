import "dotenv/config";

const config = {
  PORT: process.env.PORT,
  USERNAME: process.env.DATABASEUSERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASENAME: process.env.DATABASENAME,
  DATABASEHOST: process.env.DATABASEHOST,
  DatabaseportPORT: Number(process.env.DATABASEPORT),
  JSONWEBSECRECT: process.env.JSONWEBSECRECT,
};

console.log(config);

export default config;
