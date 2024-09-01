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
exports.updatePost = exports.getthepost = exports.deletethepost = exports.createthepost = void 0;
var utils_1 = require("../../utils");
var Models_1 = require("../../Models");
var services_1 = require("../../services");
var db_1 = __importDefault(require("../../db"));
var createthepost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, img, title, video, user, newpost, filename, url, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, img = _a.img, title = _a.title, video = _a.video;
                user = req.user;
                if (!title || !user) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "invaild credatonals", 400)];
                }
                newpost = void 0;
                filename = void 0;
                url = void 0;
                if (!!video) return [3 /*break*/, 3];
                filename = "".concat(Date.now(), ".jpg");
                return [4 /*yield*/, (0, services_1.putthefile)("image/jpeg", filename)];
            case 1:
                url = _b.sent();
                return [4 /*yield*/, Models_1.Posts.create({
                        UserId: user.Id,
                        img: filename,
                        title: title,
                        userName: user.Name,
                        userPhotoUrl: user.PhotoUrl,
                    })];
            case 2:
                newpost = _b.sent();
                return [3 /*break*/, 6];
            case 3:
                if (!!img) return [3 /*break*/, 6];
                filename = "".concat(Date.now(), ".mp4");
                return [4 /*yield*/, (0, services_1.putthefile)("video/mp4", filename)];
            case 4:
                url = _b.sent();
                return [4 /*yield*/, Models_1.Posts.create({
                        title: title,
                        UserId: user.Id,
                        video: filename,
                        userName: user.Name,
                        userPhotoUrl: user.PhotoUrl,
                    })];
            case 5:
                newpost = _b.sent();
                _b.label = 6;
            case 6: return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "sucessfully create the post", url: url }, 201)];
            case 7:
                error_1 = _b.sent();
                console.log("getting errors from createing the post", error_1);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 500)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createthepost = createthepost;
var deletethepost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var t, id, UserId, post, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, db_1.default.transaction()];
            case 1:
                t = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 8]);
                id = req.params.id;
                UserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
                if (!id || !UserId) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "invaild credationals", 400)];
                }
                return [4 /*yield*/, Models_1.Posts.findOne({
                        where: {
                            id: id,
                            UserId: UserId,
                        },
                        transaction: t,
                    })];
            case 3:
                post = _b.sent();
                if (!post) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "did not find the post", 400)];
                }
                return [4 /*yield*/, post.destroy({ transaction: t })];
            case 4:
                _b.sent();
                return [4 /*yield*/, t.commit()];
            case 5:
                _b.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "suceesfully delete the post" }, 200)];
            case 6:
                error_2 = _b.sent();
                return [4 /*yield*/, t.rollback()];
            case 7:
                _b.sent();
                console.log("getting errors from deletepost", error_2);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 500)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deletethepost = deletethepost;
var getthepost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, i, url, url, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, Models_1.Posts.findAll({})];
            case 1:
                posts = (_a.sent()) || [];
                if (!(Array.isArray(posts) && posts.length > 0)) return [3 /*break*/, 7];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < posts.length)) return [3 /*break*/, 7];
                if (!posts[i].img) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, services_1.gethefile)(posts[i].img)];
            case 3:
                url = _a.sent();
                posts[i].img = url;
                return [3 /*break*/, 6];
            case 4:
                if (!posts[i].video) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, services_1.gethefile)(posts[i].img)];
            case 5:
                url = _a.sent();
                posts[i].video = url;
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { data: posts }, 202)];
            case 8:
                error_3 = _a.sent();
                console.log("getting errors from get the posts");
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 5000)];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getthepost = getthepost;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var t, id, _a, title, video, img, post, filename, url, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, db_1.default.transaction()];
            case 1:
                t = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 16, , 18]);
                id = req.params.id;
                _a = req.body, title = _a.title, video = _a.video, img = _a.img;
                if (!title) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "atleast change the title", 400)];
                }
                return [4 /*yield*/, Models_1.Posts.findOne({
                        where: {
                            UserId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id,
                            id: id,
                        },
                        transaction: t,
                    })];
            case 3:
                post = _c.sent();
                if (!post) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Post not found", 400)];
                }
                filename = void 0;
                url = void 0;
                if (!video) return [3 /*break*/, 9];
                filename = "".concat(Date.now(), ".mp4");
                return [4 /*yield*/, (0, services_1.putthefile)("video/mp4", filename)];
            case 4:
                url = _c.sent();
                if (!title) return [3 /*break*/, 6];
                return [4 /*yield*/, post.update({ video: filename, title: title }, { transaction: t })];
            case 5:
                _c.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, post.update({ video: filename }, { transaction: t })];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8: return [3 /*break*/, 14];
            case 9:
                if (!img) return [3 /*break*/, 14];
                filename = "".concat(Date.now(), ".jpg");
                return [4 /*yield*/, (0, services_1.putthefile)("image/jpeg", filename)];
            case 10:
                url = _c.sent();
                if (!title) return [3 /*break*/, 12];
                return [4 /*yield*/, post.update({ img: filename, title: title }, { transaction: t })];
            case 11:
                _c.sent();
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, post.update({ img: filename }, { transaction: t })];
            case 13:
                _c.sent();
                _c.label = 14;
            case 14: return [4 /*yield*/, t.commit()];
            case 15:
                _c.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "Successfully updated", url: url }, 202)];
            case 16:
                error_4 = _c.sent();
                return [4 /*yield*/, t.rollback()];
            case 17:
                _c.sent();
                console.error("Error updating post:", error_4);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Internal server error", 500)];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
