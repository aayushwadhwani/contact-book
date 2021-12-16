const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide Name"],
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: [true, "Please provide Email"],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        ,'Please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide Password']
    }
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(13);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
} 

module.exports = mongoose.model('User', UserSchema);