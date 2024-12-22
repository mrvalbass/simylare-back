import { Request } from "express";
import { mwListProducts } from "./listProducts";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";

export interface ListProductsRequest extends Request {
  accessToken: string;
}

export const listProducts = () => [mwGetAccessToken, mwListProducts];
