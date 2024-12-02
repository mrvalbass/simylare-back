import type { Response } from "express";
import { AccessTokenRequest } from ".";
import { Etsy } from "../../../models/Etsy";

export async function mwSaveAccessToken(
  req: AccessTokenRequest,
  res: Response
) {
  try {
    console.log("coucou");
    const newEtsy = new Etsy({ accessToken: req.accessToken });
    newEtsy.save();
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
}
