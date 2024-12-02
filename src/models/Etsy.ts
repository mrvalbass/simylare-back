import mongoose from "mongoose";

const EtsySchema = new mongoose.Schema({
  access_token: String,
});

export const Etsy = mongoose.model("etsy", EtsySchema);
