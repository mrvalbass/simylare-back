"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwSendEmail = mwSendEmail;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function mwSendEmail(transporter) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            const response = yield transporter.sendMail(customerMailOptions);
            if (response.accepted.includes(email)) {
                yield transporter.sendMail(ownerMailOptions);
                res.json({ success: true, message: "email sent" });
            }
            else {
                throw new Error(`Email not valid : ${email}`);
            }
        }
        catch (e) {
            console.log("Error while sending email :", e);
            res.json({ success: false, message: `error when sending email: ${e}` });
        }
    });
}
//# sourceMappingURL=sendEmail.js.map