"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAccessToken = void 0;
const checkState_1 = require("./checkState");
const getAccessToken_1 = require("../../../middleware/getAccessToken");
const saveAccessToken_1 = require("./saveAccessToken");
const saveAccessToken = () => [
    checkState_1.mwCheckState,
    getAccessToken_1.mwGetAccessToken,
    saveAccessToken_1.mwSaveAccessToken,
];
exports.saveAccessToken = saveAccessToken;
//# sourceMappingURL=index.js.map