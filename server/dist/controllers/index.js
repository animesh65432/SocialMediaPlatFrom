"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserContorllers_1 = require("./UserContorllers");
var ForgetPassword_1 = require("./ForgetPassword");
var Posts_1 = require("./Posts");
var Profile_1 = require("./Profile");
var Rooms_1 = require("./Rooms");
var controllers = {
    UserControllers: { createtheuser: UserContorllers_1.createtheuser, logintheuser: UserContorllers_1.logintheuser },
    forgetpassword: { sendEmail: ForgetPassword_1.sendEmail, updatePassword: ForgetPassword_1.updatePassword },
    post: { createthepost: Posts_1.createthepost, deletethepost: Posts_1.deletethepost, getthepost: Posts_1.getthepost, updatePost: Posts_1.updatePost },
    Profile: { Gettheuserprofile: Profile_1.Gettheuserprofile, updatetheprofile: Profile_1.updatetheprofile },
    Room: { GetalltheRooms: Rooms_1.GetalltheRooms, deletethepost: Posts_1.deletethepost },
};
exports.default = controllers;
