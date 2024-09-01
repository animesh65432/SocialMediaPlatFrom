"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../../db"));
var Users = db_1.default.define("Users", {
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    PhotoUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://th.bing.com/th/id/OIP.ADA-vGQMw0K3Bzbn9ZOhPgHaE8?rs=1&pid=ImgDetMain",
    },
    Gender: {
        type: sequelize_1.DataTypes.ENUM("Male", "Female"),
        allowNull: true,
    },
    followers: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
});
exports.default = Users;
