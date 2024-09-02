import "dotenv/config";

const config = {
  PORT: process.env.PORT,
  USERNAME: process.env.DATABASEUSERNAME,
  PASSWORD: process.env.PASSWORD,
  DATABASENAME: process.env.DATABASENAME,
  DATABASEHOST: process.env.DATABASEHOST,
  DatabaseportPORT: Number(process.env.DATABASEPORT),
  JSONWEBSECRECT: process.env.JSONWEBSECRECT,
  NODEMAILERUSER: process.env.NODEMAILERUSER,
  NODEMAILERPASSWORD: process.env.NODEMAILERPASSWORD,
  S3SERECTACESSKEY: process.env.S3SERECTACESSKEY,
  S3ACESSKEYID: process.env.S3ACESSKEYID,
  S3BUCKETNAME: process.env.S3BUCKETNAME,
  S3REGION: process.env.S3REGION,
  Frontendurl: process.env.FRONTENDURL,
};

console.log(config.Frontendurl);

export default config;
