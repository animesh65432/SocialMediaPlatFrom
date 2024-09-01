"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../../controllers"));
var middlewares_1 = __importDefault(require("../../middlewares"));
var profilerouter = (0, express_1.Router)();
profilerouter.get("/Get", middlewares_1.default, controllers_1.default.Profile.Gettheuserprofile);
profilerouter.put("/update", middlewares_1.default, controllers_1.default.Profile.updatetheprofile);
exports.default = profilerouter;
