import { Request } from "express";
import { mwGetAccessToken } from "./getAccessToken";
import { mwListProducts } from "./listProducts";

export interface ListProductsRequest extends Request {
  accessToken: string;
}

export const listProducts = () => [mwGetAccessToken, mwListProducts];
