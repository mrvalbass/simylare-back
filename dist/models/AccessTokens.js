"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AccessTokenSchema = new mongoose_1.default.Schema({
    etsy_access_token: String,
    etsy_refresh_token: String,
});
exports.AccessToken = mongoose_1.default.model("accessTokens", AccessTokenSchema);
//# sourceMappingURL=AccessTokens.js.map