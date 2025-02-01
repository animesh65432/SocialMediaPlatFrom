"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRouter = exports.profilerouter = exports.PostRouter = exports.forgetPasswordrouter = exports.UserRouter = void 0;
var userRouter_1 = __importDefault(require("./userRouter"));
exports.UserRouter = userRouter_1.default;
var forgetpassword_1 = __importDefault(require("./forgetpassword"));
exports.forgetPasswordrouter = forgetpassword_1.default;
var postrouter_1 = __importDefault(require("./postrouter"));
exports.PostRouter = postrouter_1.default;
var profile_1 = __importDefault(require("./profile"));
exports.profilerouter = profile_1.default;
var Rooms_1 = __importDefault(require("./Rooms"));
exports.RoomRouter = Rooms_1.default;
