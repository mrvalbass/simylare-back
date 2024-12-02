import { NextFunction, Request, Response } from "express";
import { state } from "..";

export function mwCheckState(req: Request, res: Response, next: NextFunction) {
  const { state: returnedState } = req.query;
  if (state !== returnedState) {
    res.status(400).send("Invalid state");
    return;
  }
  next();
}
