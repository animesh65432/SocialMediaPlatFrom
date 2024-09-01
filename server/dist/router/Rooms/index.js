"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = __importDefault(require("../../controllers"));
var middlewares_1 = __importDefault(require("../../middlewares"));
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/Get", middlewares_1.default, controllers_1.default.Room.GetalltheRooms);
router.delete("/delete/:Id", middlewares_1.default, controllers_1.default.Room.deletethepost);
exports.default = router;
