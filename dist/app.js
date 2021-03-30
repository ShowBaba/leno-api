"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const variables_1 = tslib_1.__importDefault(require("./utils/variables"));
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const db_1 = require("./dbConfig/db");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
dotenv_1.default.config();
class App {
    constructor(routes) {
        this.app = express_1.default();
        this.port = variables_1.default.port;
        this.env = process.env.NODE_ENV || 'development';
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.default.info(`🚀 Server started at http://localhost:3000`);
        });
        return;
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield db_1.intializeDB();
            const redisPORT = Number(variables_1.default.redisPort || 6379);
        });
    }
    ;
    initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan_1.default('combined'));
            this.app.use(cors_1.default({ origin: true, credentials: true }));
        }
        else if (this.env === 'development') {
            this.app.use(morgan_1.default('dev'));
            this.app.use(cors_1.default({ origin: true, credentials: true }));
        }
        this.app.use(hpp_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map