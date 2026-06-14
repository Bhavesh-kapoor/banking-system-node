
export const successResponse = (
    res,
    message,
    data = null,
    statusCode = 200
) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
};

export const errorResponse = (
    res,
    message,
    statusCode = 500,
    errors = null
) => {
    return res.status(statusCode).json({
        status: false,
        message,
        errors 
    });
};