import type { Response } from "express";
import { codeVerifier } from "..";
import { AccessTokenRequest } from ".";

export async function mwGetAccessToken(req: AccessTokenRequest, res: Response) {
  const { code } = req.query;
  console.log(req.query);

  try {
    const getTokenOptions = {
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
    const response = await fetch(
      "https://api.etsy.com/v3/public/oauth/token",
      getTokenOptions
    ).then((r) => r.json());
    req.accessToken = response.access_token;
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
}
