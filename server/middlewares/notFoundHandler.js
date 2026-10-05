export const notFoundHandler = () => {
    throw Object.assign(new Error(), {
        status: 404,
        message: "Path not found",
    });
};
