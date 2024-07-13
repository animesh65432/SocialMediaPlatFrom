"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __importDefault(require("./Config"));
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
