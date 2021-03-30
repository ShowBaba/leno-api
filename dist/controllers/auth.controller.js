"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.signup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                const signupUserData = yield this.authService.signup(userData);
                res.status(201).json({
                    success: true,
                    data: signupUserData,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                const findUser = yield this.authService.login(userData);
                res.status(200).json({
                    success: true,
                    data: findUser
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map