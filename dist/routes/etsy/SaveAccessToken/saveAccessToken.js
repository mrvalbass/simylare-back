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
exports.mwSaveAccessToken = mwSaveAccessToken;
const AccessTokens_1 = require("../../../models/AccessTokens");
function mwSaveAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield AccessTokens_1.AccessToken.find({});
            if (accessToken.length !== 0) {
                yield AccessTokens_1.AccessToken.deleteMany({});
            }
            const newAccessToken = new AccessTokens_1.AccessToken({
                etsy_access_token: req.accessToken,
            });
            const token = yield newAccessToken.save();
            res.status(200).json({ token });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Failed to save access token", details: e });
        }
    });
}
//# sourceMappingURL=saveAccessToken.js.map