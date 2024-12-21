import mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema({
  etsy_access_token: String,
  etsy_refresh_token: String,
  expires_in: Number,
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
});

export const AccessToken = mongoose.model("accessTokens", AccessTokenSchema);
