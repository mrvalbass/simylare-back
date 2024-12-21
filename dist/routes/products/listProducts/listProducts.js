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
function mwListProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const getDataOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${req.accessToken}`,
                    "x-api-key": process.env.CLIENT_ID,
                },
            };
            const shopData = yield fetch(`https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images`, getDataOptions).then((r) => r.json());
            const productList = shopData.results
                .filter((product) => product.state === "active")
                .map((product) => ({
                title: product.title,
                description: product.description,
                quantity: product.quantity,
                url: product.url,
                tags: product.tags,
                materials: product.materials,
                price: `${product.price.amount / product.price.divisor} ${product.price.currency_code}`,
            }));
            console.log(shopData.results);
            res.json(shopData.results);
        }
        catch (error) {
            console.error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            res.status(500).send("Error during OAuth flow");
        }
    });
}
//# sourceMappingURL=listProducts.js.map