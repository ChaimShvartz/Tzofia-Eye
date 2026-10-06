export const checkAccess =
    (...roles) =>
    (req, _res, next) => {
        const { role } = req.user;
        if (!roles.includes(role))
            throw Object.assign(new Error(), {
                status: 403,
                message: "Permission denied",
            });
        next();
    };
