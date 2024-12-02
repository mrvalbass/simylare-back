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
app.use("/", routes_1.appRouter);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
exports.default = app;
// app.get("/oauth/redirect", async (req, res) => {
//     // Use the access token to fetch shop data
//     const getDataOptions = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "x-api-key": process.env.CLIENT_ID,
//       },
//     };
//     console.log(process.env.SIMYLARE_SHOP_ID);
//     const shopData = await fetch(
//       `https://api.etsy.com/v3/application/shops/${process.env.SIMYLARE_SHOP_ID}/listings?state=active&includes=images,shop`,
//       getDataOptions
//     ).then((r) => r.json());
//     console.log(shopData);
//     res.json(shopData.data);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).send("Error during OAuth flow");
//   }
// });
//# sourceMappingURL=index.js.map