import { Request } from "express";

export interface AccessTokenRequest extends Request {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
