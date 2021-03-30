"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const app_1 = tslib_1.__importDefault(require("./app"));
const user_route_1 = tslib_1.__importDefault(require("./routes/user.route"));
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
const auth_route_1 = tslib_1.__importDefault(require("./routes/auth.route"));
const app = new app_1.default([
    new user_route_1.default(),
    new index_route_1.default(),
    new auth_route_1.default(),
]);
app.listen();
//# sourceMappingURL=server.js.map