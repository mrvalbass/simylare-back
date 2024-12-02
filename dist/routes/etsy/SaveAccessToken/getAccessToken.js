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
const __1 = require("..");
function mwGetAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.query;
        try {
            const getTokenOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    grant_type: "authorization_code",
                    client_id: process.env.CLIENT_ID,
                    redirect_uri: process.env.REDIRECT_URI,
                    code: code,
                    code_verifier: __1.codeVerifier,
                }),
            };
            const response = yield fetch("https://api.etsy.com/v3/public/oauth/token", getTokenOptions).then((r) => r.json());
            req.accessToken = response.access_token;
        }
        catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    });
}
//# sourceMappingURL=getAccessToken.js.map