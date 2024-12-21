"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwGetAccessToken = mwGetAccessToken;
const AccessTokens_1 = require("../../../models/AccessTokens");
function mwGetAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { etsy_access_token, created_at, expires_in, etsy_refresh_token } = yield AccessTokens_1.AccessToken.findOne();
            console.log(created_at);
            // if (Date.now() - expires_in > created_at) {
            // }
            req.accessToken = etsy_access_token;
            next();
        }
        catch (e) {
            res.status(500).json({ error: e });
        }
    });
}
//# sourceMappingURL=getAccessToken.js.map