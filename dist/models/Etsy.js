"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etsy = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EtsySchema = new mongoose_1.default.Schema({
    access_token: String,
});
exports.Etsy = mongoose_1.default.model("etsy", EtsySchema);
//# sourceMappingURL=Etsy.js.map