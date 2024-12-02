import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import connectDB from "./db/connection";
import { appRouter } from "./routes";
import cors from "cors";

dotenv.config();
connectDB();

const app: Application = express();
const port = 8000;

// const corsOptions = {
//   origin: [
//     "https://www.simylare.com",
//     "https://simylare.vercel.app",
//     "http://localhost:3000/",
//   ],
// };

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;

// app.get("/oauth/redirect", async (req, res) => {
//     // Use the access token to fetch shop data
//     const getDataOptions = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "x-api-key": process.env.CLIENT_ID,
//       },
//     };
//     console.log(process.env.SIMYLARE_SHOP_ID);

//     const shopData = await fetch(
//       `https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images,shop`,
//       getDataOptions
//     ).then((r) => r.json());
//     console.log(shopData);

//     res.json(shopData.data);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).send("Error during OAuth flow");
//   }
// });
