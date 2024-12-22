import { mwGetAccessToken } from "../../../middleware/getAccessToken";
import { mwListProducts } from "./listProducts";

export const listProducts = () => [mwGetAccessToken, mwListProducts];
