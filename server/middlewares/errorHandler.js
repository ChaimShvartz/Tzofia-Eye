export const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    const { status, message } = {
        status: 500,
        message: "Server Internal Error",
        ...err,
    };
    res.status(status).json({ success: false, message });
};
