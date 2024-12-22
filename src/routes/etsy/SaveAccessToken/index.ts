import { Request } from "express";
import { mwCheckState } from "./checkState";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";
import { mwSaveAccessToken } from "./saveAccessToken";

export interface AccessTokenRequest extends Request {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const saveAccessToken = () => [
  mwCheckState,
  mwGetAccessToken,
  mwSaveAccessToken,
];

export const refreshAccessToken = () => [mwGetAccessToken, mwSaveAccessToken];
