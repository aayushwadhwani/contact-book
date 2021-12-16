const { customAPIError } = require('../errors/customAPIError');

const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof customAPIError) {
        return res.status(err.statusCode).json({success: false, message: err.message});
    }

    return res.status(500).json({success: false, message: err}); 
};

module.exports = errorHandlerMiddleware;