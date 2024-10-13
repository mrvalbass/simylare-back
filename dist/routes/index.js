"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = require("./products");
exports.appRouter = express_1.default.Router();
exports.appRouter.use("/products", products_1.productsRouter);
//# sourceMappingURL=index.js.map