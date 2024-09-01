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
exports.roomHandler = void 0;
var Config_1 = __importDefault(require("../Config"));
var uuid_1 = require("uuid");
var Models_1 = require("../Models");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = __importDefault(require("../db"));
var roomHandler = function (socket) {
    var createRoom = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var t, roomId, NewRoom, error_1;
        var Name = _b.Name, Topics = _b.Topics;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, db_1.default.transaction()];
                case 1:
                    t = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 5, , 7]);
                    roomId = (0, uuid_1.v4)();
                    socket.join(roomId);
                    return [4 /*yield*/, Models_1.Room.create({ Id: roomId, Name: Name, Topics: Topics }, { transaction: t })];
                case 3:
                    NewRoom = _c.sent();
                    console.log(NewRoom.Id);
                    socket.emit("room-created", { roomId: roomId });
                    return [4 /*yield*/, t.commit()];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [4 /*yield*/, t.rollback()];
                case 6:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    // const joinedroom = async ({ roomid, peerid, token }: joinedtheroomtypes) => {
    //   const t = await database.transaction();
    //   try {
    //     socket.join(roomid);
    //     console.log("jointheroomid", roomid);
    //     socket.on("ready", () => {
    //       console.log("ready for user");
    //       socket.to(roomid).emit("user_joined", { peerid });
    //     });
    //     const users = [{}];
    //     socket.emit("Get-participants", { users });
    //     await t.commit();
    //   } catch (error) {
    //     console.error("Error in joinedroom function:", error);
    //     await t.rollback();
    //   }
    // };
    var joinedroom = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var t, verifythetoken, Email, user, userId, _c, userRoom, created, participants, participantswithnames, error_2;
        var roomid = _b.roomid, peerid = _b.peerid, token = _b.token;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, db_1.default.transaction()];
                case 1:
                    t = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 8, , 10]);
                    if (!roomid || !peerid || !token) {
                        throw new Error("roomid, peerid, or token is missing");
                    }
                    verifythetoken = jsonwebtoken_1.default.verify(token, Config_1.default.JSONWEBSECRECT);
                    Email = verifythetoken.Email;
                    return [4 /*yield*/, Models_1.Users.findOne({
                            where: { Email: Email },
                            transaction: t,
                        })];
                case 3:
                    user = _d.sent();
                    if (!user || user.Id === null || user.Id === undefined) {
                        throw new Error("User not found or User ID is invalid");
                    }
                    userId = user.Id;
                    return [4 /*yield*/, Models_1.UserRooms.upsert({ roomid: roomid, userid: userId }, { transaction: t })];
                case 4:
                    _c = _d.sent(), userRoom = _c[0], created = _c[1];
                    socket.join(roomid);
                    socket.on("ready", function () {
                        socket.to(roomid).emit("user_joined", { peerid: peerid });
                    });
                    return [4 /*yield*/, Models_1.UserRooms.findAll({
                            where: { roomid: roomid },
                            transaction: t,
                        })];
                case 5:
                    participants = _d.sent();
                    return [4 /*yield*/, Promise.all(participants.map(function (participant) { return __awaiter(void 0, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Models_1.Users.findOne({
                                            where: { Id: participant.userid },
                                        })];
                                    case 1:
                                        user = _a.sent();
                                        return [2 /*return*/, {
                                                Name: user === null || user === void 0 ? void 0 : user.Name,
                                                Photourl: user === null || user === void 0 ? void 0 : user.PhotoUrl,
                                            }];
                                }
                            });
                        }); }))];
                case 6:
                    participantswithnames = _d.sent();
                    console.log(participantswithnames, "users name");
                    socket.emit("Get-participants", { participantswithnames: participantswithnames });
                    return [4 /*yield*/, t.commit()];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 10];
                case 8:
                    error_2 = _d.sent();
                    console.error("Error in joinedroom function:", error_2);
                    return [4 /*yield*/, t.rollback()];
                case 9:
                    _d.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    socket.on("create-room", createRoom);
    socket.on("joined_room", joinedroom);
};
exports.roomHandler = roomHandler;
