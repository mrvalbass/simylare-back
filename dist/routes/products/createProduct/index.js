"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const createProduct_1 = require("./createProduct");
const validateBody_1 = require("../../../middleware/validateBody");
const zod_1 = require("zod");
const createProductBodyValidator = zod_1.z.object({ img: zod_1.z.string() }).strict();
const createProduct = () => {
    return [
        (0, validateBody_1.validateBody)(createProductBodyValidator),
        createProduct_1.mwCreateProduct,
    ];
};
exports.createProduct = createProduct;
//# sourceMappingURL=index.js.map