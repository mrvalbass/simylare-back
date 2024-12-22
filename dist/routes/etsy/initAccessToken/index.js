"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAccessToken = void 0;
const checkState_1 = require("./checkState");
const getAccessToken_1 = require("../../../middleware/getAccessToken");
const __1 = require("..");
const initAccessToken = () => [
    checkState_1.mwCheckState,
    (0, getAccessToken_1.mwGetAccessToken)(__1.codeVerifier),
];
exports.initAccessToken = initAccessToken;
//# sourceMappingURL=index.js.map