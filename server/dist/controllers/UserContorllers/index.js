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
exports.addfollowers = exports.Others_Peoples_See = exports.logintheuser = exports.createtheuser = void 0;
var utils_1 = require("../../utils");
var Models_1 = require("../../Models");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Config_1 = __importDefault(require("../../Config"));
var createtheuser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Name, Email, Password, checktheuser, hashpassword, newuser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, Name = _a.Name, Email = _a.Email, Password = _a.Password;
                if (!Name || !Email || !Password) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "invaild credationals", 400)];
                }
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: { Email: Email },
                    })];
            case 1:
                checktheuser = _b.sent();
                if (checktheuser) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "user alredy singup", 400)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(Password, 10)];
            case 2:
                hashpassword = _b.sent();
                return [4 /*yield*/, Models_1.Users.create({
                        Name: Name,
                        Email: Email,
                        Password: hashpassword,
                        PhotoUrl: "https://tg-stockach.de/wp-content/uploads/2020/12/5f4d0f15338e20133dc69e95_dummy-profile-pic-300x300.png",
                    })];
            case 3:
                newuser = _b.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, {
                        data: "sucessfully create the user",
                    }, 201)];
            case 4:
                error_1 = _b.sent();
                console.log(error_1, "Error getting From creating User ..");
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 500)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createtheuser = createtheuser;
var logintheuser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Email, Password, user, token, checkpassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, Email = _a.Email, Password = _a.Password;
                if (!Email || !Password) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "invaild credationals", 400)];
                }
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: { Email: Email },
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "user did not signup yet", 400)];
                }
                token = jsonwebtoken_1.default.sign({ Email: Email }, Config_1.default.JSONWEBSECRECT);
                return [4 /*yield*/, bcryptjs_1.default.compare(Password, user.Password)];
            case 2:
                checkpassword = _b.sent();
                if (!checkpassword) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Password is wrong", 400)];
                }
                res.cookie("token", token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "sucessfully log in", token: token, user: user }, 200)];
            case 3:
                error_2 = _b.sent();
                console.log("error from getting login the user", error_2);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 500)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logintheuser = logintheuser;
var Others_Peoples_See = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                if (!userId) {
                    return [2 /*return*/, res.status(400).json({
                            message: "userId is required"
                        })];
                }
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: {
                            Id: userId
                        },
                        attributes: ["Id", "Name", "PhotoUrl", "followers", "Gender", "Email"]
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        user: user
                    })];
            case 2:
                error_3 = _a.sent();
                console.log(error_3, "errors in Others Peoples see");
                return [2 /*return*/, res.status(5000).json({
                        message: "internal server errors"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Others_Peoples_See = Others_Peoples_See;
var addfollowers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, count, connvertuserIdtoNumber, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                console.log(userId, req.user.followers);
                if (userId === undefined || req.user.followers === undefined) {
                    return [2 /*return*/, res.status(400).json({
                            message: "userId and user is undefined"
                        })];
                }
                count = req.user.followers += 1;
                connvertuserIdtoNumber = Number(userId);
                return [4 /*yield*/, Models_1.Users.update({ followers: count }, {
                        where: {
                            Id: connvertuserIdtoNumber
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        messages: "sucessfully update it"
                    })];
            case 2:
                error_4 = _a.sent();
                console.log(error_4, "errors in addfollowers");
                res.status(500).json({
                    message: "internal server errors"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addfollowers = addfollowers;
