"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("../../controllers"));
var middlewares_1 = __importDefault(require("../../middlewares"));
var UserRouter = express_1.default.Router();
UserRouter.post("/create", controllers_1.default.UserControllers.createtheuser);
UserRouter.post("/login", controllers_1.default.UserControllers.logintheuser);
UserRouter.get("/seeothersPeoples/:userId", middlewares_1.default, controllers_1.default.UserControllers.Others_Peoples_See);
UserRouter.put("/updatefollowers/:userId", middlewares_1.default, controllers_1.default.UserControllers.addfollowers);
exports.default = UserRouter;
