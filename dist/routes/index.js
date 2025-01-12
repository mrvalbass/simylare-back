"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = require("./products");
const etsy_1 = require("./etsy");
const contact_1 = require("./contact");
exports.appRouter = express_1.default.Router();
exports.appRouter.use("/products", products_1.productsRouter);
exports.appRouter.use("/etsy", etsy_1.etsyRouter);
exports.appRouter.use("/contact", contact_1.contactRouter);
//# sourceMappingURL=index.js.map