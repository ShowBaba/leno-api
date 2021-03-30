"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_service_1 = tslib_1.__importDefault(require("../services/users.service"));
class UsersController {
    constructor() {
        this.userService = new users_service_1.default();
        this.getUsers = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const findAllUsersData = yield this.userService.findAllUser();
                return res.status(200).json({
                    success: true,
                    data: findAllUsersData
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserById = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userId = Number(req.params.id);
            try {
                const findOneUserData = yield this.userService.findUserById(userId);
                res.status(200).json({
                    success: true,
                    data: findOneUserData
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UsersController;
//# sourceMappingURL=user.controller.js.map