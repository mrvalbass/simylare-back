import type { NextFunction, Response } from "express";
import { AccessToken } from "../../../models/AccessTokens";
import { ListProductsRequest } from ".";

export async function mwGetAccessToken(
  req: ListProductsRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { etsy_access_token } = await AccessToken.findOne();
    req.accessToken = etsy_access_token;
    next();
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
