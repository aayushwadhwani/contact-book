const jwt = require('jsonwebtoken');
const { createCustomError } = require('../errors/customAPIError') 

const authorization = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next(createCustomError('Unauthenticated no bearer',403));
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = { userId: payload.userId,  name: payload.name};
        next();
    } catch (error) {
        return next(createCustomError('authentication invalid no jwt valid',403));
    }
};

module.exports = authorization;