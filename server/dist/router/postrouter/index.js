"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../../controllers"));
var middlewares_1 = __importDefault(require("../../middlewares"));
var PostRouter = (0, express_1.Router)();
PostRouter.post("/createpost", middlewares_1.default, controllers_1.default.post.createthepost);
PostRouter.delete("/deletepost/:id", middlewares_1.default, controllers_1.default.post.deletethepost);
PostRouter.get("/GetThePost", middlewares_1.default, controllers_1.default.post.getthepost);
PostRouter.put("/update/:id", middlewares_1.default, controllers_1.default.post.updatePost);
exports.default = PostRouter;
