const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customAPIError');
const User = require('../model/User');

const registerUser = asyncWrapper( async(req,res,next) =>{

    const { name,email,password } = req.body;
    //all the fields are checked by using mongoose validation.
    //password hashing is done just before saving the document. View model/User.js for the code
    const user =  await User.create({name,email,password});

    //once the account is created, a token is sent back, in case if the user wants direct access after signup.
    res.status(201).json({success: true,name:user.name, token: user.createJWT()});
});

const loginUser = asyncWrapper( async(req,res,next) => {


    const { email, password } = req.body;
    const user = await User.findOne({email});

    //if no user with the given email
    if(!user){
        return next(createCustomError('Invalid Credentials',403));
    }

    // model/User.js for the code
    const isPasswordRight = await user.comparePassword(password);

    //if user found but not the correct password
    if(!isPasswordRight){
        return next(createCustomError('Invalid Credentials',403));
    }
    
    //if OK then sends back the token.
    res.status(200).json({success: true, name:user.name, token: user.createJWT()});    
});

module.exports = {
    registerUser,
    loginUser
};