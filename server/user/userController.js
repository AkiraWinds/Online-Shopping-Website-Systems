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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const model_manager_1 = require("./model-manager");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const result = model_manager_1.UserService.createUser(user);
            if ('error' in result) {
                res.status(400).json(result);
            }
            else {
                res.status(201).json(result);
            }
        });
    }
}
exports.UserController = UserController;
