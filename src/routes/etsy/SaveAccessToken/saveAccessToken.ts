import type { Response } from "express";
import { AccessTokenRequest } from ".";
import { Etsy } from "../../../models/Etsy";

export async function mwSaveAccessToken(
  req: AccessTokenRequest,
  res: Response
) {
  try {
    const newEtsy = new Etsy({ etsy_access_token: req.accessToken });
    const token = newEtsy.save();
    res.status(200).json({ token });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
}
