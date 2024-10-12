import mongoose from "mongoose";

export default function connectDB() {
  if (!process.env.CONNECTION_STRING) {
    throw new Error("Connexion string is missing");
  }
  mongoose
    .connect(process.env.CONNECTION_STRING, { connectTimeoutMS: 20000 })
    .then(() => console.log("Database connected"))
    .catch((e) => console.error(e));
}
