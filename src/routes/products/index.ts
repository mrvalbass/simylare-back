import { Router } from "express";
import { createProduct } from "./createProduct";

export const productsRouter = Router();

productsRouter.post("/createProduct", createProduct());
