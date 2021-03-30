"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
class AuthRoute {
    constructor() {
        this.router = express_1.Router();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', this.authController.signup);
        this.router.post('/login', this.authController.login);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map