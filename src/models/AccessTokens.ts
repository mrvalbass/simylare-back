import mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema({
  etsy_access_token: String,
  etsy_refresh_token: String,
});

export const AccessToken = mongoose.model("accessTokens", AccessTokenSchema);
