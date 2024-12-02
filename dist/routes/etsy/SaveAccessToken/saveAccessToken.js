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
const Etsy_1 = require("../../../models/Etsy");
function mwSaveAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEtsy = new Etsy_1.Etsy({ etsy_access_token: req.accessToken });
            const token = newEtsy.save();
            res.status(200).json({ token });
        }
        catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    });
}
//# sourceMappingURL=saveAccessToken.js.map