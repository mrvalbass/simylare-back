import { Request } from "express";
import { mwAuth } from "./auth";
import { mwState } from "./state";

export interface AuthRequest extends Request {
  state: string;
  codeChallenge: string;
}

export const auth = () => [mwState, mwAuth];
