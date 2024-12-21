import type { NextFunction, Response } from "express";
import { AccessToken } from "../../../models/AccessTokens";
import { ListProductsRequest } from ".";

export async function mwGetAccessToken(
  req: ListProductsRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { etsy_access_token, created_at, expires_in, etsy_refresh_token } =
      await AccessToken.findOne();
    console.log(created_at);

    // if (Date.now() - expires_in > created_at) {
    // }

    req.accessToken = etsy_access_token;
    next();
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
