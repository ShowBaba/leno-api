"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intializeDB = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const User_1 = require("./entities/User");
function intializeDB() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "postgres",
            "database": "leno-dev",
            entities: [
                User_1.User
            ],
            synchronize: true,
        });
        logger_1.default.info('Database successfully initialize');
    });
}
exports.intializeDB = intializeDB;
//# sourceMappingURL=db.js.map