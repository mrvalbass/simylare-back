"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_1 = require("./auth");
const state_1 = require("./state");
const auth = () => [state_1.mwState, auth_1.mwAuth];
exports.auth = auth;
//# sourceMappingURL=index.js.map