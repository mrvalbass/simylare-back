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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
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
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "GET",
        headers: {
            "x-api-key": process.env.CLIENT_ID,
        },
    };
    const response = yield fetch("https://api.etsy.com/v3/application/openapi-ping", requestOptions);
    if (response.ok) {
        const data = yield response.json();
        res.send(data);
    }
    else {
        res.send("oops");
    }
}));
const state = crypto_1.default.randomBytes(16).toString("hex");
const codeVerifier = crypto_1.default.randomBytes(32).toString("base64url");
const sha256 = (buffer) => crypto_1.default.createHash("sha256").update(buffer).digest("base64url");
const codeChallenge = sha256(codeVerifier);
app.get("/auth/etsy", (req, res) => {
    const url = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=listings_r&client_id=${process.env.CLIENT_ID}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    res.redirect(url);
});
app.get("/oauth/redirect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { code, state: returnedState } = req.query;
    if (state !== returnedState) {
        res.status(400).send("Invalid state");
        return;
    }
    console.log(code);
    try {
        // Exchange the authorization code for an access token
        const getTokenOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.CLIENT_ID,
                redirect_uri: process.env.REDIRECT_URI,
                code: code,
                code_verifier: codeVerifier,
            }),
        };
        const response = yield fetch("https://api.etsy.com/v3/public/oauth/token", getTokenOptions).then((r) => r.json());
        console.log(response);
        const accessToken = response.access_token;
        console.log("Access Token:", accessToken);
        // Use the access token to fetch shop data
        const getDataOptions = {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        };
        const shopData = yield fetch("https://api.etsy.com/v3/application/shops", getDataOptions).then((r) => r.json());
        console.log(shopData);
        res.json(shopData.data);
    }
    catch (error) {
        console.error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        res.status(500).send("Error during OAuth flow");
    }
}));
app.use("/", routes_1.appRouter);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map