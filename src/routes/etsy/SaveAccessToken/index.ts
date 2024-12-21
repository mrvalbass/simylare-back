import { mwGetAccessToken } from "./getAccessToken";
import { mwCheckState } from "./checkState";
import { mwSaveAccessToken } from "./saveAccessToken";
import { Request } from "express";

export interface AccessTokenRequest extends Request {
  accessToken: string;
  refreshToken: string;
}

export const saveAccessToken = () => [
  mwCheckState,
  mwGetAccessToken,
  mwSaveAccessToken,
];
