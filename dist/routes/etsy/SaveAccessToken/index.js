"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.saveAccessToken = void 0;
const checkState_1 = require("./checkState");
const getAccessToken_1 = require("../../../middleware/getAccessToken");
const saveAccessToken_1 = require("./saveAccessToken");
const saveAccessToken = () => [
    checkState_1.mwCheckState,
    getAccessToken_1.mwGetAccessToken,
    saveAccessToken_1.mwSaveAccessToken,
];
exports.saveAccessToken = saveAccessToken;
const refreshAccessToken = () => [getAccessToken_1.mwGetAccessToken, saveAccessToken_1.mwSaveAccessToken];
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=index.js.map