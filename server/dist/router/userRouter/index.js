"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("../../controllers"));
var UserRouter = express_1.default.Router();
UserRouter.post("/create", controllers_1.default.UserControllers.createtheuser);
UserRouter.post("/login", controllers_1.default.UserControllers.logintheuser);
exports.default = UserRouter;
