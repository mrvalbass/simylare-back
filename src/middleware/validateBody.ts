import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodObject } from "zod";

import { StatusCodes } from "http-status-codes";

interface ValidatedRequest<T> extends Request<any, T, any, any, any> {}

export function validateBody<T>(schema: ZodObject<any>) {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
