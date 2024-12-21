"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const createProduct_1 = require("./createProduct");
const listProducts_1 = require("./listProducts");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.post("/createProduct", (0, createProduct_1.createProduct)());
exports.productsRouter.get("/listProducts", (0, listProducts_1.listProducts)());
//# sourceMappingURL=index.js.map