import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  img: String,
});

export const Product = mongoose.model("products", ProductSchema);
