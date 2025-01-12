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
        const mailOptions = {
            from: "site@simylare.com",
            to: process.env.EMAIL_USER,
            subject: "Contact depuis le site web",
            text: `Nom : ${req.body.name}\nEmail : ${req.body.email}\nMessage : ${req.body.message}`,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log(info);
            res.json({ success: true, message: "email sent" });
        }
        catch (e) {
            console.log("Error while sending email :", e);
            res.json({ success: false, message: "error when sending email" });
        }
    });
}
//# sourceMappingURL=sendEmail.js.map