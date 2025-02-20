import type { NextFunction, Response } from "express";
import { AccessToken } from "../models/AccessTokens";
import { AccessTokenRequest } from "../types";

export function mwGetAccessToken(codeVerifier?: string) {
  return async (req: AccessTokenRequest, res: Response, next: NextFunction) => {
    try {
      let getTokenOptions;
      if (codeVerifier) {
        // request for a new token
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
        //request to refresh a token
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

      if (!response.access_token) {
        throw new Error("No access token provided");
      }

      const accessTokens = await AccessToken.find();
      if (accessTokens.length !== 0) {
        await AccessToken.deleteMany({});
      }

      const newAccessToken = new AccessToken({
        etsy_access_token: response.access_token,
        etsy_refresh_token: response.refresh_token,
        expires_in: response.expires_in,
      });
      const token = await newAccessToken.save();
      res.status(200).json({ message: "token saved", token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
    next();
  };
}
