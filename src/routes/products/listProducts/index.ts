import { mwListProducts } from "./listProducts";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";

export const listProducts = () => [mwGetAccessToken, mwListProducts];
