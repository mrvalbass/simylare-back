"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
function validateBody(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ error: "Invalid data", details: errorMessages });
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        }
    };
}
//# sourceMappingURL=validateBody.js.map