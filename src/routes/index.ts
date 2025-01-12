import express from "express";
import { productsRouter } from "./products";
import { etsyRouter } from "./etsy";
import { contactRouter } from "./contact";

export const appRouter = express.Router();

appRouter.use("/products", productsRouter);
appRouter.use("/etsy", etsyRouter);
appRouter.use("/contact", contactRouter);
