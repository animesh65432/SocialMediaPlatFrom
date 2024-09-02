"use strict";
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
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://social-media-plat-from-4xni-l9uf9ynpl-animesh-duttas-projects.vercel.app",
    credentials: true,
}));
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://social-media-plat-from-4xni-l9uf9ynpl-animesh-duttas-projects.vercel.app",
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", router_1.UserRouter);
app.use("/forget", router_1.forgetPasswordrouter);
app.use("/post", router_1.PostRouter);
app.use("/profile", router_1.profilerouter);
app.use("/Room", router_1.RoomRouter);
corn_1.default.start();
db_1.default
    .sync({ alter: true })
    .then(function () {
    server.listen(Config_1.default.PORT || 4000, function () {
        console.log("Server started at port ".concat(Config_1.default.PORT || 4000));
    });
})
    .catch(function (errors) {
    console.error("Database sync error:", errors);
});
