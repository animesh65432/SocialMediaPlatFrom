"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database = new sequelize_1.Sequelize("meetup", // Database name
"postgres", // Username
"new_password", // Password
{
    host: "localhost", // Database host
    dialect: "postgres", // Dialect
    logging: console.log, // Enable logging for debugging
});
// Test the connection
database.authenticate()
    .then(function () {
    console.log('Connection to the database has been established successfully.');
})
    .catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
exports.default = database;
