"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const sendEmail_1 = require("./sendEmail");
exports.contactRouter = (0, express_1.Router)();
exports.contactRouter.post("/email", (0, sendEmail_1.sendEmail)());
//# sourceMappingURL=index.js.map