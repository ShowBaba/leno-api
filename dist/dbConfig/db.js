"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intializeDB = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const User_1 = require("./entities/User");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
function intializeDB() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection({
            "type": "postgres",
            "host": "ec2-18-204-101-137.compute-1.amazonaws.com",
            "port": 5432,
            "username": "mubjxkeulkbrqj",
            "password": "6e58789ba9ad48856b2356abd031bed4b8f5499e04e5d0a16573621b28bcb7c3",
            "database": "d8hopie1mv50av",
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