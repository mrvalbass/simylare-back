import type { Response } from "express";
import { AccessTokenRequest } from ".";
import { Etsy } from "../../../models/Etsy";

export async function mwSaveAccessToken(
  req: AccessTokenRequest,
  res: Response
) {
  try {
    const accessToken = await Etsy.find({});
    if (accessToken.length !== 0) {
      await Etsy.deleteMany({});
    }
    const newAccessToken = new Etsy({ etsy_access_token: req.accessToken });
    const token = await newAccessToken.save();
    res.status(200).json({ token });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).json({ error: "Failed to save access token", details: e });
  }
}
