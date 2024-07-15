"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __importDefault(require("./Config"));
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router_1 = require("./router");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var Models_1 = require("./Models");
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", router_1.UserRouter);
app.use("/forget", router_1.forgetPasswordrouter);
app.use("/post", router_1.PostRouter);
Models_1.Users.hasMany(Models_1.ForgetPassword);
Models_1.ForgetPassword.belongsTo(Models_1.Users);
Models_1.Users.hasMany(Models_1.Posts);
Models_1.Posts.belongsTo(Models_1.Users);
db_1.default
    .sync()
    .then(function (res) {
    app.listen(Config_1.default.PORT || 4000, function () {
        console.log("server start at the ".concat(Config_1.default.PORT));
    });
})
    .catch(function (errors) {
    console.log(errors);
});
