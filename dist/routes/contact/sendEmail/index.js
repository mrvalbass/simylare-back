"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const zod_1 = require("zod");
const sendEmail_1 = require("./sendEmail");
const validateBody_1 = require("../../../middleware/validateBody");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmailBodyValidator = zod_1.z
    .object({ name: zod_1.z.string(), email: zod_1.z.string(), message: zod_1.z.string() })
    .strict();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = () => [
    (0, validateBody_1.validateBody)(sendEmailBodyValidator),
    (0, sendEmail_1.mwSendEmail)(transporter),
];
exports.sendEmail = sendEmail;
//# sourceMappingURL=index.js.map