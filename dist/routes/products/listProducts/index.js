"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = void 0;
const getAccessToken_1 = require("../../../middleware/getAccessToken");
const listProducts_1 = require("./listProducts");
const listProducts = () => [getAccessToken_1.mwGetAccessToken, listProducts_1.mwListProducts];
exports.listProducts = listProducts;
//# sourceMappingURL=index.js.map