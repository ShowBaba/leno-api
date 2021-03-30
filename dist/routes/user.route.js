"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_controller_1 = tslib_1.__importDefault(require("../controllers/user.controller"));
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = express_1.Router();
        this.usersController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=user.route.js.map