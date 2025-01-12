import { z } from "zod";
import { mwSendEmail } from "./sendEmail";
import { validateBody } from "../../../middleware/validateBody";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmailBodyValidator = z
  .object({ name: z.string(), email: z.string(), message: z.string() })
  .strict();

type sendEmailBody = z.infer<typeof sendEmailBodyValidator>;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = () => [
  validateBody<sendEmailBody>(sendEmailBodyValidator),
  mwSendEmail(transporter),
];
