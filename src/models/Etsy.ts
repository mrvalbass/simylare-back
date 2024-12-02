import mongoose from "mongoose";

const EtsySchema = new mongoose.Schema({
  etsy_access_token: String,
});

export const Etsy = mongoose.model("tokens", EtsySchema);
