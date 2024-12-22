"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.codeVerifier = exports.state = exports.etsyRouter = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const crypto_1 = __importDefault(require("crypto"));
// import { saveAccessToken } from "./saveAccessToken";
exports.etsyRouter = (0, express_1.Router)();
exports.state = crypto_1.default.randomBytes(16).toString("hex");
exports.codeVerifier = crypto_1.default.randomBytes(32).toString("base64url");
const sha256 = (buffer) => crypto_1.default.createHash("sha256").update(buffer).digest("base64url");
exports.sha256 = sha256;
exports.etsyRouter.get("/auth", (0, auth_1.auth)());
// etsyRouter.get("/accessToken", saveAccessToken());
//# sourceMappingURL=index.js.map