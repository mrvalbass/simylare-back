"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mwCheckState = mwCheckState;
const __1 = require("..");
function mwCheckState(req, res, next) {
    const { state: returnedState } = req.query;
    if (__1.state !== returnedState) {
        res.status(400).send("Invalid state");
        return;
    }
    next();
}
//# sourceMappingURL=checkState.js.map