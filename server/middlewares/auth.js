import { verifyToken } from "../services/auth.services.js";

export const auth = (req, _res, next) => {
    const { authorization } = req.headers;
    const parts = authorization?.split(" ");
    if (!(parts && parts[0] === "Bearer" && parts[1]))
        throw Object.assign(new Error(), {
            status: 401,
            message: "Token missing or not in format 'Bearer <token>",
        });
    const token = parts[1];
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        throw Object.assign(new Error(), {
            status: 403,
            message: "Invalid or expired token",
        });
    }
};
