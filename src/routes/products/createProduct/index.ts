import { mwCreateProduct } from "./createProduct";
import { validateBody } from "../../../middleware/validateBody";
import { z } from "zod";

const createProductBodyValidator = z.object({ img: z.string() }).strict();

type createProductBody = z.infer<typeof createProductBodyValidator>;

export const createProduct = () => {
  return [
    validateBody<createProductBody>(createProductBodyValidator),
    mwCreateProduct,
  ];
};
