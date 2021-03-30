"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../execptions/HttpException"));
const typeorm_1 = require("typeorm");
const User_1 = require("../dbConfig/entities/User");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const class_validator_1 = require("class-validator");
class UserService {
    findAllUser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allUser = yield typeorm_1.getConnection()
                .getRepository(User_1.User)
                .createQueryBuilder('user')
                .getMany();
            return allUser;
        });
    }
    findUserById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (class_validator_1.isEmpty(userId))
                throw new HttpException_1.default(http_status_1.default.BAD_REQUEST, 'userId cannot be null!');
            const user = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select('user')
                .from(User_1.User, 'user')
                .where('user.id = :userId', { id: userId })
                .getOne();
            if (!user)
                throw new HttpException_1.default(+http_status_1.default[404], 'User not found!');
            return user;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map