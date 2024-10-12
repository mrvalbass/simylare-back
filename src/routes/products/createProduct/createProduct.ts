import type { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/Products";

export async function mwCreateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { img } = req.body;
    const product = new Product({
      img,
    });
    const data = await product.save();
    res.json(data);
  } catch (e: unknown) {
    console.error(e);
  }
}
