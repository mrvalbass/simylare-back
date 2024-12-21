import type { Response } from "express";
import { AccessTokenRequest } from ".";
import { AccessToken } from "../../../models/AccessTokens";

export async function mwSaveAccessToken(
  req: AccessTokenRequest,
  res: Response
) {
  try {
    const accessToken = await AccessToken.find({});
    if (accessToken.length !== 0) {
      await AccessToken.deleteMany({});
    }
    const newAccessToken = new AccessToken({
      etsy_access_token: req.accessToken,
      etsy_refresh_token: req.refreshToken,
      expires_in: req.expiresIn,
    });
    const token = await newAccessToken.save();
    res.status(200).json({ token });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({ error: "Failed to save access token", details: e });
  }
}
