const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customAPIError')
const Contact = require('../model/Contact');

const createContact = asyncWrapper( async(req,res,next) => {
    const createdBy = req.user.userId;
    const { name, email, phoneNumber } = req.body;
    const phoneRegex = /^[1-9][0-9]{9}$/;
    if(!phoneRegex.test(phoneNumber)){
        return next(createCustomError('Please provide Valid Phone Number',500));
    }
    const ispreviousContact = await Contact.findOne({phoneNumber, createdBy });
    if(ispreviousContact){
        return next(createCustomError('Contact Already Exists',500));
    }
    const toInsert = {name, phoneNumber, createdBy}
    if(email){
        toInsert['email'] = email
    }
    const contact = await Contact.create(toInsert)
   res.status(200).json({success: true, contact});
});

const updateContact = asyncWrapper( async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { name, email, phoneNumber } = req.body;
    const contact = await Contact.findOne({_id: id, createdBy: userId});
    if(!contact) {
        return next(createCustomError('Invalid ID',405));
    }
    const toUpdate = {};
    if(name) toUpdate.name = name;
    if(email) toUpdate.email = email;
    if(!phoneNumber){
        const update = await Contact.updateOne({ _id: id, createdBy: userId },toUpdate,{new: true, runValidators: true});
        return res.status(200).json({success: true, update});
    }
    const phoneNumberExists = await Contact.findOne({phoneNumber, createdBy: userId});
    if(phoneNumberExists) {
        return next(createCustomError('Contact Already Exist',503));
    }
    toUpdate.phoneNumber = phoneNumber;
    const update = await Contact.updateOne({ _id: id, createdBy: userId },toUpdate,{new: true, runValidators: true});
    res.status(200).json({success: true, update});
});

const deleteContact = asyncWrapper( async (req,res,next) => {
    const { id } = req.params;
    const createdBy = req.user.userId;
    const isAllowed = await Contact.findOne( {_id: id, createdBy} );
    if(!isAllowed){
        return next(createCustomError('Contact Does Not Exist', 406))
    }
    const deleteContact = await Contact.deleteOne({createdBy, _id: id}); 
    res.status(200).json({success: true, deleteContact});
});

module.exports = {
    createContact,
    updateContact,
    deleteContact
};