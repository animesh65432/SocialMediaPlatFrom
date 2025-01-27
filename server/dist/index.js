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
var Config_1 = __importDefault(require("./Config"));
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var http_1 = __importDefault(require("http"));
var router_1 = require("./router");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var roomhandler_1 = require("./roomhandler");
var corn_1 = __importDefault(require("./corn"));
var utils_1 = require("./utils");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    console.log("a user connected");
    (0, roomhandler_1.roomHandler)(socket);
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", router_1.UserRouter);
app.use("/forget", router_1.forgetPasswordrouter);
app.use("/post", router_1.PostRouter);
app.use("/profile", router_1.profilerouter);
app.use("/Room", router_1.RoomRouter);
corn_1.default.start();
db_1.default
    .sync({ force: true })
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.CreatedummyUser)({
                    Name: "testname",
                    Email: "test@gmail.com",
                    Password: "testPassword"
                })];
            case 1:
                _a.sent();
                server.listen(Config_1.default.PORT || 4000, function () {
                    console.log("Server started at port ".concat(Config_1.default.PORT || 4000));
                });
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (errors) {
    console.error("Database sync error:", errors);
});
