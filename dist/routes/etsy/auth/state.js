"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwState = mwState;
const __1 = require("..");
function mwState(req, _, next) {
    req.state = __1.state;
    req.codeChallenge = (0, __1.sha256)(__1.codeVerifier);
    next();
}
//# sourceMappingURL=state.js.map