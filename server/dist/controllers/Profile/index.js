"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gettheuserprofile = exports.updatetheprofile = void 0;
var Models_1 = require("../../Models");
var utils_1 = require("../../utils");
var services_1 = require("../../services");
var Gettheuserprofile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, data, user, img, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
                data = {};
                return [4 /*yield*/, Models_1.Users.findOne({
                        where: { Id: userid },
                        attributes: ["Name", "Gender", "PhotoUrl", "followers"],
                    })];
            case 1:
                user = _b.sent();
                if (!(user === null || user === void 0 ? void 0 : user.PhotoUrl)) {
                    data = __assign(__assign({}, user), { PhotoUrl: "https://th.bing.com/th/id/OIP.ADA-vGQMw0K3Bzbn9ZOhPgHaE8?rs=1&pid=ImgDetMain" });
                }
                else {
                    img = (0, services_1.gethefile)(user.PhotoUrl);
                    data = __assign(__assign({}, user), { PhotoUrl: img });
                }
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { data: data }, 200)];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "internal server errors", 500)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Gettheuserprofile = Gettheuserprofile;
var updatetheprofile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Name, Gender, PhotoUrl, updateData, filename, url, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, Name = _a.Name, Gender = _a.Gender, PhotoUrl = _a.PhotoUrl;
                console.log(Name, Gender, PhotoUrl);
                updateData = {};
                if (Name)
                    updateData.Name = Name;
                if (Gender)
                    updateData.Gender = Gender;
                if (!PhotoUrl) return [3 /*break*/, 2];
                filename = "".concat(Date.now(), ".jpg");
                return [4 /*yield*/, (0, services_1.putthefile)("image/jpeg", filename)];
            case 1:
                url = _c.sent();
                updateData.PhotoUrl = filename;
                _c.label = 2;
            case 2:
                if (Object.keys(updateData).length === 0) {
                    return [2 /*return*/, (0, utils_1.RejectResponse)(res, "No data provided for update", 400)];
                }
                return [4 /*yield*/, Models_1.Users.update(updateData, {
                        where: {
                            Id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id,
                        },
                    })];
            case 3:
                _c.sent();
                return [2 /*return*/, (0, utils_1.SuccessResponse)(res, { message: "Successfully updated", updateData: updateData }, 202)];
            case 4:
                error_2 = _c.sent();
                console.error(error_2);
                return [2 /*return*/, (0, utils_1.RejectResponse)(res, "Internal server error", 500)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updatetheprofile = updatetheprofile;
