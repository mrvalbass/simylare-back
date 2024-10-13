"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    if (!process.env.CONNECTION_STRING) {
        throw new Error("Connexion string is missing");
    }
    mongoose_1.default
        .connect(process.env.CONNECTION_STRING, { connectTimeoutMS: 20000 })
        .then(() => console.log("Database connected"))
        .catch((e) => console.error(e));
}
//# sourceMappingURL=connection.js.map