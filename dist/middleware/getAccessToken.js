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
const etsy_1 = require("../routes/etsy");
const AccessTokens_1 = require("../models/AccessTokens");
function mwGetAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let getTokenOptions;
            if (req.query) {
                const { code } = req.query;
                getTokenOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        grant_type: "authorization_code",
                        client_id: process.env.CLIENT_ID,
                        redirect_uri: process.env.REDIRECT_URI,
                        code: code,
                        code_verifier: etsy_1.codeVerifier,
                    }),
                };
            }
            else {
                let { created_at, expires_in, etsy_refresh_token } = yield AccessTokens_1.AccessToken.findOne();
                if (Date.now() - expires_in * 1000 <= created_at.getTime()) {
                    next();
                    return;
                }
                getTokenOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        grant_type: "refresh_token",
                        client_id: process.env.CLIENT_ID,
                        refresh_token: etsy_refresh_token,
                    }),
                };
            }
            const response = yield fetch("https://api.etsy.com/v3/public/oauth/token", getTokenOptions).then((r) => r.json());
            req.accessToken = response.access_token;
            req.refreshToken = response.refresh_token;
            req.expiresIn = response.expires_in;
        }
        catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
        next();
    });
}
//# sourceMappingURL=getAccessToken.js.map