import type { Response } from "express";
import type { Listing, ListingResponse } from "./types";
import { ListProductsRequest } from ".";

export async function mwListProducts(req: ListProductsRequest, res: Response) {
  try {
    const getDataOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
        "x-api-key": process.env.CLIENT_ID,
      },
    };
    const shopData: ListingResponse = await fetch(
      `https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images`,
      getDataOptions
    ).then((r) => r.json());
    const productList = shopData.results
      .filter((product: Listing) => product.state === "active")
      .map((product: Listing) => ({
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        url: product.url,
        tags: product.tags,
        materials: product.materials,
        price: `${product.price.amount / product.price.divisor} ${
          product.price.currency_code
        }`,
        imgUrls: product.images
          .sort((imageA, imageB) => imageA.rank - imageB.rank)
          .map((image) => image.url_fullxfull),
      }));
    res.json(productList);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error });
  }
}
