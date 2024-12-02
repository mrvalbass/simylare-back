import { NextFunction, Response } from "express";
import { AuthRequest } from ".";
import { codeVerifier, sha256, state } from "..";

export function mwState(req: AuthRequest, _: Response, next: NextFunction) {
  req.state = state;
  req.codeChallenge = sha256(codeVerifier);
  next();
}
