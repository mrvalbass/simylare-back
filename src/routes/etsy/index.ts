import { Router } from "express";
import { auth } from "./auth";
import crypto from "crypto";

export const etsyRouter = Router();

export const state = crypto.randomBytes(16).toString("hex");
export const codeVerifier = crypto.randomBytes(32).toString("base64url");
export const sha256 = (buffer: string) =>
  crypto.createHash("sha256").update(buffer).digest("base64url");

etsyRouter.get("/auth", auth());
etsyRouter.get("/getAccessToken", saveAccessToken());
