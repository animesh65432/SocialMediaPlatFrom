"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var Config_1 = __importDefault(require("../Config"));
var database = new sequelize_1.Sequelize(Config_1.default.DATABASENAME, Config_1.default.USERNAME, Config_1.default.PASSWORD, {
    host: Config_1.default.DATABASEHOST,
    port: 15391,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.default = database;
