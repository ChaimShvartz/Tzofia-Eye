export const validation = (schema) => (req, _res, next) => {
    const { success, data, error } = schema.safeParse(req.body);
    if (!success)
        throw Object.assign(new Error(), {
            status: 400,
            message: error.issues[0].message,
        });
    req.body = data;
    next();
};
