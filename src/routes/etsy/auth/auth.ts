import type { Response } from "express";
import { AuthRequest } from ".";

export function mwAuth(req: AuthRequest, res: Response) {
  try {
    const url = `https://www.etsy.com/oauth/connect?
    response_type=code
    &redirect_uri=${process.env.REDIRECT_URI}
    &scope=listings_r
    &client_id=${process.env.CLIENT_ID}
    &state=${req.state}
    &code_challenge=${req.codeChallenge}
    &code_challenge_method=S256`;
    res.redirect(url);
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
}
