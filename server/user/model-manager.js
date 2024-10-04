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
exports.__esModule = true;
exports.UserService = void 0;
var uuid_1 = require("uuid");
var fs = require("fs");
;
var usersData = require('../users.json');
var users = usersData;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.createUser = function (userData) {
        var existingUser = users.find(function (user) { return user.email === userData.email; });
        if (existingUser) {
            return { error: "Email address is already in use." };
        }
        var userId = (0, uuid_1.v4)();
        var newUser = __assign(__assign({}, userData), { userId: userId });
        users.push(newUser);
        UserService.saveUsers();
        return __assign(__assign({}, userData), { userId: userId, message: "User created successfully." });
    };
    UserService.saveUsers = function () {
        var filePath = './users.json';
        var data = JSON.stringify(users, null, 2);
        fs.writeFileSync(filePath, data, 'utf8');
    };
    return UserService;
}());
exports.UserService = UserService;
