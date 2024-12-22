import type { NextFunction, Response } from "express";
import { codeVerifier } from "../routes/etsy";
import { AccessToken } from "../models/AccessTokens";
import { AccessTokenRequest } from "../types";

export async function mwGetAccessToken(
  req: AccessTokenRequest,
  res: Response,
  next: NextFunction
) {
  try {
    let getTokenOptions;
    if (req.query) {
      const { code } = req.query;
      getTokenOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI,
          code: code,
          code_verifier: codeVerifier,
        }),
      };
    } else {
      let { created_at, expires_in, etsy_refresh_token } =
        await AccessToken.findOne();
      if (Date.now() - expires_in * 1000 <= created_at.getTime()) {
        next();
        return;
      }
      getTokenOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID,
          refresh_token: etsy_refresh_token,
        }),
      };
    }
    const response = await fetch(
      "https://api.etsy.com/v3/public/oauth/token",
      getTokenOptions
    ).then((r) => r.json());
    req.accessToken = response.access_token;
    req.refreshToken = response.refresh_token;
    req.expiresIn = response.expires_in;
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
  next();
}
