const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide Name'],
        minlength: 3,
        maxlength: 24
    },
    email: {
        type: String,
        required: false,
        maxlength: 30,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    ,'Please provide valid email'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide Phone Number'],
        minlength: 10,
        maxlength: 10
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: [true,"Please Provide the User"],
        ref: 'User'
    }
},{timestamps: true});

module.exports = mongoose.model('Contact',contactSchema);