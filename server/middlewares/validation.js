import { CreatingAlert } from "../models/alert.model.js";

export const validation = (schema) => (req, _res, next) => {
    const { success, data, error } = schema.safeParse(req.body);
    if (!success) {
        const { path, message } = error.issues[0];
        throw Object.assign(new Error(), {
            status: 400,
            message: `${path}: ${message}`,
        });
    }
    req.body = data;
    next();
};
