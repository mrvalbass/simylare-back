import express from "express";
import type { Application, Request, Response } from "express";
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

app.get("/ping", async (req, res) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.CLIENT_ID,
    },
  };

  const response = await fetch(
    "https://api.etsy.com/v3/application/openapi-ping",
    requestOptions
  );

  if (response.ok) {
    const data = await response.json();
    res.send(data);
  } else {
    res.send("oops");
  }
});

const state = crypto.randomBytes(16).toString("hex");
const codeVerifier = crypto.randomBytes(32).toString("base64url");

const sha256 = (buffer: string) =>
  crypto.createHash("sha256").update(buffer).digest("base64url");
const codeChallenge = sha256(codeVerifier);

app.get("/auth/etsy", (req, res) => {
  const url = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=listings_r&client_id=${process.env.CLIENT_ID}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  res.redirect(url);
});

app.get("/oauth/redirect", async (req, res) => {
  const { code, state: returnedState } = req.query;

  if (state !== returnedState) {
    res.status(400).send("Invalid state");
    return;
  }

  try {
    // Exchange the authorization code for an access token
    const getTokenOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
        code_verifier: codeVerifier,
      }),
    };
    const response = await fetch(
      "https://api.etsy.com/v3/public/oauth/token",
      getTokenOptions
    ).then((r) => r.json());
    const accessToken = response.access_token;
    console.log("Access Token:", accessToken);

    // Use the access token to fetch shop data
    const getDataOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": process.env.CLIENT_ID,
      },
    };
    const shopData = await fetch(
      "https://api.etsy.com/v3/application/shops",
      getDataOptions
    ).then((r) => r.json());
    console.log(shopData);

    res.json(shopData.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error during OAuth flow");
  }
});

app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
