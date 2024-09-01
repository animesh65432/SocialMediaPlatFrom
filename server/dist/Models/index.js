"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.UserRooms = exports.Posts = exports.ForgetPassword = exports.Users = void 0;
var Users_1 = __importDefault(require("./Users"));
exports.Users = Users_1.default;
var ForgetPassword_1 = __importDefault(require("./ForgetPassword"));
exports.ForgetPassword = ForgetPassword_1.default;
var Posts_1 = __importDefault(require("./Posts"));
exports.Posts = Posts_1.default;
var Rooms_1 = __importDefault(require("./Rooms"));
exports.Room = Rooms_1.default;
var UsersRooms_1 = __importDefault(require("./UsersRooms"));
exports.UserRooms = UsersRooms_1.default;
Users_1.default.hasMany(ForgetPassword_1.default);
ForgetPassword_1.default.belongsTo(Users_1.default);
Users_1.default.hasMany(Posts_1.default);
Posts_1.default.belongsTo(Users_1.default);
Users_1.default.belongsToMany(Rooms_1.default, {
    through: UsersRooms_1.default,
    foreignKey: "userid",
    otherKey: "roomid",
});
Rooms_1.default.belongsToMany(Users_1.default, {
    through: UsersRooms_1.default,
    foreignKey: "roomid",
    otherKey: "userid",
});
