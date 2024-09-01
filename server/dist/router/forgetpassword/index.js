"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../../controllers"));
var forgetPasswordrouter = (0, express_1.Router)();
forgetPasswordrouter.post("/sent", controllers_1.default.forgetpassword.sendEmail);
forgetPasswordrouter.post("/update", controllers_1.default.forgetpassword.updatePassword);
exports.default = forgetPasswordrouter;
