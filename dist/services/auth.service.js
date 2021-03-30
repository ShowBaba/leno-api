"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const HttpException_1 = tslib_1.__importDefault(require("../execptions/HttpException"));
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const User_1 = require("../dbConfig/entities/User");
const http_status_1 = tslib_1.__importDefault(require("http-status"));
const class_validator_1 = require("class-validator");
class AuthService {
    signup(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (class_validator_1.isEmpty(userData))
                throw new HttpException_1.default(+http_status_1.default['400'], http_status_1.default['400_MESSAGE']);
            console.log('searching user.......');
            const findUser = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select('user')
                .from(User_1.User, 'user')
                .where('user.email = :email', { email: userData.email })
                .getOne();
            if (findUser)
                throw new HttpException_1.default(http_status_1.default.CONFLICT, 'Validation Error', [
                    {
                        field: 'email',
                        location: 'body',
                        messages: [`Your email ${userData.email} already exists`],
                    }
                ]);
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            console.log('creating');
            const data = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values([
                data
            ])
                .execute();
            return data;
        });
    }
    login(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (class_validator_1.isEmpty(userData))
                throw new HttpException_1.default(400, 'User data cannot be empty!');
            const findUser = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select('user')
                .from(User_1.User, 'user')
                .where('user.email = :email', { email: userData.email })
                .getOne();
            if (!findUser)
                throw new HttpException_1.default(http_status_1.default.NOT_FOUND, 'Not Found!!', [
                    {
                        field: 'email',
                        location: 'body',
                        messages: [`User with: email ${userData.email} does not exist!`],
                    }
                ]);
            const isPasswordMatching = yield bcrypt_1.default.compare(userData.password, findUser.password);
            if (!isPasswordMatching)
                throw new HttpException_1.default(409, 'Password is incorrect!!');
            const tokenData = this.createToken(findUser);
            return findUser;
        });
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }) };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map