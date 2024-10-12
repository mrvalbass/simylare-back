import express from "express";
import { productsRouter } from "./products";
export const appRouter = express.Router();

appRouter.use("/products", productsRouter);
