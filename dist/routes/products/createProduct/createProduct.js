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
exports.mwCreateProduct = mwCreateProduct;
const Products_1 = require("../../../models/Products");
function mwCreateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { img } = req.body;
            const product = new Products_1.Product({
                img,
            });
            const data = yield product.save();
            res.json(data);
        }
        catch (e) {
            console.error(e);
        }
    });
}
//# sourceMappingURL=createProduct.js.map