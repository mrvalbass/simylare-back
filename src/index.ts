import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection";
import { appRouter } from "./routes";
import cors from "cors";

dotenv.config();
connectDB();

const app: Application = express();
const port = 8000;

const corsOptions = {
  origin: [
    "https://www.simylare.com",
    "https://simylare.vercel.app",
    "http://localhost:3000/",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
