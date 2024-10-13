"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const createProduct_1 = require("./createProduct");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.post("/createProduct", (0, createProduct_1.createProduct)());
//# sourceMappingURL=index.js.map