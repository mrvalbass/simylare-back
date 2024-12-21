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
exports.mwListProducts = mwListProducts;
const AccessTokens_1 = require("../../../models/AccessTokens");
function mwListProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const accessToken = yield AccessTokens_1.AccessToken.find();
        console.log(accessToken);
        try {
            const getDataOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "x-api-key": process.env.CLIENT_ID,
                },
            };
            console.log(process.env.SIMYLARE_SHOP_ID);
            const shopData = yield fetch(`https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images,shop`, getDataOptions).then((r) => r.json());
            console.log(shopData);
            res.json(shopData.data);
        }
        catch (error) {
            console.error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            res.status(500).send("Error during OAuth flow");
        }
    });
}
//# sourceMappingURL=listProducts.js.map