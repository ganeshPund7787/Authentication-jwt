export const errorMiddleware = (err, req, res, next) => {
    const { statusCode, message } = err || (500 && "Internal server error");

    return res.status(statusCode).json({
        success: false,
        message: message
    })
}