"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAccessToken = void 0;
const checkState_1 = require("./checkState");
const saveAccessToken_1 = require("./saveAccessToken");
const saveAccessToken = () => [checkState_1.mwCheckState, saveAccessToken_1.mwSaveAccessToken];
exports.saveAccessToken = saveAccessToken;
//# sourceMappingURL=index.js.map