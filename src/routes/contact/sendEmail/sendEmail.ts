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
    const { name, email, message } = req.body;
    const customerText = `
Bonjour ${name},

Merci d'avoir contacté Simylare.
Votre message nous a bien été transmis, nous vous répondrons dans les meilleurs délais

Jimmy de Simylare`;

    const customerMailOptions = {
      from: "noreply@simylare.com",
      to: email,
      subject: "Merci d'avoir contacté Simylare",
      text: customerText,
    };

    const ownerMailOptions = {
      from: "site@simylare.com",
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "Contact depuis le site web",
      text: `Nom : ${name}\nEmail : ${email}\nMessage : ${message}`,
    };
    try {
      const response = await transporter.sendMail(customerMailOptions);
      if (response.accepted.includes(email)) {
        await transporter.sendMail(ownerMailOptions);
        res.json({ success: true, message: "email sent" });
      } else {
        throw new Error(`Email not valid : ${email}`);
      }
    } catch (e) {
      console.log("Error while sending email :", e);
      res.json({ success: false, message: `error when sending email: ${e}` });
    }
  };
}
