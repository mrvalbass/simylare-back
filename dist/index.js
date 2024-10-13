"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, connection_1.default)();
const app = (0, express_1.default)();
const port = 8000;
// const corsOptions = {
//   origin: [
//     "https://www.simylare.com",
//     "https://simylare.vercel.app",
//     "http://localhost:3000/",
//   ],
// };
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Welcome");
});
app.use("/", routes_1.appRouter);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map