import { Router } from "express";
import { sendEmail } from "./sendEmail";

export const contactRouter = Router();

contactRouter.post("/email", sendEmail());
