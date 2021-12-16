const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customAPIError');
const User = require('../model/User');

const registerUser = asyncWrapper( async(req,res,next) =>{
    const { name,email,password } = req.body;
    const user =  await User.create({name,email,password});
    res.status(201).json({success: true,name:user.name, token: user.createJWT()});
});

const loginUser = asyncWrapper( async(req,res,next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(createCustomError('Invalid Credentials',403));
    }
    
    const isPasswordRight = await user.comparePassword(password);
    if(!isPasswordRight){
        return next(createCustomError('Invalid Credentials',403));
    }
    
    res.status(200).json({success: true, name:user.name, token: user.createJWT()});    
});

module.exports = {
    registerUser,
    loginUser
};