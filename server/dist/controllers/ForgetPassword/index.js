"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.sendEmail = void 0;
var utils_1 = require("../../utils");
var Models_1 = require("../../Models");
var uuid_1 = require("uuid");
var nodemailer_1 = __importDefault(require("nodemailer"));
var Config_1 = __importDefault(require("../../Config"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var db_1 = __importDefault(require("../../db"));
var sendEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var t, Email, checkUser, id, forgetPassword, transporter, mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.transaction()];
            case 1:
                t = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 7, , 9]);
                Email = req.body.Email;
                if (!Email) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Invalid credentials", 400)];
                }
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: { Email: Email },
                        transaction: t,
                    })];
            case 3:
                checkUser = _a.sent();
                if (!checkUser) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "User has not signed up yet", 400)];
                }
                id = (0, uuid_1.v4)();
                return [4 /*yield*/, Models_1.ForgetPassword.create({
                        UserId: checkUser.Id,
                        id: id,
                        active: false,
                    }, { transaction: t })];
            case 4:
                forgetPassword = _a.sent();
                transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: Config_1.default.NODEMAILERUSER,
                        pass: Config_1.default.NODEMAILERPASSWORD,
                    },
                });
                mailOptions = {
                    from: Config_1.default.NODEMAILERUSER,
                    to: Email,
                    subject: "Password Reset Request",
                    html: "<a href='http://localhost:5173/update/".concat(forgetPassword.id, "'>Click here to reset your password</a>"),
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 5:
                _a.sent();
                return [4 /*yield*/, t.commit()];
            case 6:
                _a.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "Email sent successfully" }, 201)];
            case 7:
                error_1 = _a.sent();
                return [4 /*yield*/, t.rollback()];
            case 8:
                _a.sent();
                console.error("Error sending email:", error_1);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Internal server error", 500)];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.sendEmail = sendEmail;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var t, _a, Password, id, forgetPassword, user, hashPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, db_1.default.transaction()];
            case 1:
                t = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, , 11]);
                _a = req.body, Password = _a.Password, id = _a.id;
                if (!id) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "No ID provided", 400)];
                }
                if (!Password) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "No password provided", 400)];
                }
                return [4 /*yield*/, Models_1.ForgetPassword.findOne({
                        where: { id: id },
                        transaction: t,
                    })];
            case 3:
                forgetPassword = _b.sent();
                console.log(forgetPassword);
                if (!forgetPassword || forgetPassword.active) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Password reset link is invalid or expired", 400)];
                }
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: { Id: forgetPassword.UserId },
                        transaction: t,
                    })];
            case 4:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "User not found", 404)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(Password, 10)];
            case 5:
                hashPassword = _b.sent();
                return [4 /*yield*/, user.update({ Password: hashPassword }, { transaction: t })];
            case 6:
                _b.sent();
                return [4 /*yield*/, forgetPassword.update({ active: false }, { transaction: t })];
            case 7:
                _b.sent();
                return [4 /*yield*/, t.commit()];
            case 8:
                _b.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "Password updated successfully" }, 200)];
            case 9:
                error_2 = _b.sent();
                return [4 /*yield*/, t.rollback()];
            case 10:
                _b.sent();
                console.error("Error updating password:", error_2);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Internal server error", 500)];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
