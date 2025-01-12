import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export function mwSendEmail(
  transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >
) {
  return async (req: Request, res: Response) => {
    if (!transporter) {
      res.json("Error in transporter configuration");
      return;
    }
    const mailOptions = {
      from: "site@simylare.com",
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: "Contact depuis le site web",
      text: `Nom : ${req.body.name}\nEmail : ${req.body.email}\nMessage : ${req.body.message}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "email sent" });
    } catch (e) {
      console.log("Error while sending email :", e);
      res.json({ success: false, message: `error when sending email: ${e}` });
    }
  };
}
