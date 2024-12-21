import type { Request, Response } from "express";
import { AccessToken } from "../../../models/AccessTokens";

export async function mwListProducts(req: Request, res: Response) {
  const accessToken = await AccessToken.find();
  console.log(accessToken);
  try {
    const getDataOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": process.env.CLIENT_ID,
      },
    };
    console.log(process.env.SIMYLARE_SHOP_ID);

    const shopData = await fetch(
      `https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images,shop`,
      getDataOptions
    ).then((r) => r.json());
    console.log(shopData);

    res.json(shopData.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error during OAuth flow");
  }
}
