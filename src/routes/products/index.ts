import { Router } from "express";
import { createProduct } from "./createProduct";
import { listProducts } from "./listProducts";

export const productsRouter = Router();

productsRouter.post("/createProduct", createProduct());
productsRouter.get("/listProducts", listProducts());
