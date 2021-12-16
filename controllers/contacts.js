const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/customAPIError')
const Contact = require('../model/Contact');

const createContact = asyncWrapper( async(req,res,next) => {

    //access the userId of loggedin user
    const createdBy = req.user.userId;
    const { name, email, phoneNumber } = req.body;
    const phoneRegex = /^[1-9][0-9]{9}$/;

    //if not a valid phone number
    if(!phoneRegex.test(phoneNumber)){
        return next(createCustomError('Please provide Valid Phone Number',500));
    }
    const ispreviousContact = await Contact.findOne({phoneNumber, createdBy });

    //if phone number already exists
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

const addBulkContacts = asyncWrapper( async(req, res, next) => {
    const createdBy = req.user.userId;

    // GETS ARRAY OF OBJECTS where each object can have {name,email,phoneNumber}..
    const contacts = req.body;

    //inserts the createdBy in each object
    contacts.forEach( contact => {
        contact.createdBy = createdBy;
    });

    const bulkContacts = await Contact.create(contacts);
    res.json({success: true, bulkContacts});
});

const getAllContacts = asyncWrapper( async (req, res, next) => {
    const createdBy = req.user.userId;

    //query string parameters for pagination, search based on phone number.
    const { pageNumber, Limit, seemsLike } = req.query;

    const toFindQuery = {createdBy};

    //if seemsLike exists then search accordingly.
    if(seemsLike) {
        toFindQuery.phoneNumber = { $regex:seemsLike, $options: 'i' };
    }
    let toSend = Contact.find(toFindQuery);

    //if pageNumber and Limit is given then that will be applied
    //else by default the endpoint is paginated as 10 objects per page
    const page = Number(pageNumber) >= 1 ? Number(pageNumber) : 1;
    const limit = Number(Limit) >= 1 ? Number(Limit) : 10;
    const skip = (page-1)*limit;

    toSend.skip(skip).limit(limit);

    const allContacts = await toSend;
    // console.log(toFindQuery);
    res.status(200).json({success: true, hits:allContacts.length ,allContacts});
});

const getContact = asyncWrapper( async(req,res,next) => {

    //gets a phone number as the param.
    const { id } = req.params;
    const createdBy = req.user.userId;
    const contact = await Contact.findOne({createdBy, phoneNumber: id });
    if(!contact){
        return next(createCustomError(`Cannot Find Contact with Number: ${id}`,406));
    }

    res.status(200).json({success: true, contact});
});

const updateContact = asyncWrapper( async (req, res, next) => {

    // gets the mongoDB ObjectID as param
    const { id } = req.params;
    const { userId } = req.user;
    const { name, email, phoneNumber } = req.body;
    const contact = await Contact.findOne({_id: id, createdBy: userId});

    // if such ObjectID doesnot exists
    if(!contact) {
        return next(createCustomError('Invalid ID',405));
    }

    const toUpdate = {};
    if(name) toUpdate.name = name;
    if(email) toUpdate.email = email;

    //if phoneNumber is not updated.
    if(!phoneNumber){
        const update = await Contact.updateOne({ _id: id, createdBy: userId },toUpdate,{new: true, runValidators: true});
        return res.status(200).json({success: true, update});
    }

    //checking if the given phoneNumber which is to be updated already exists.
    const phoneNumberExists = await Contact.findOne({phoneNumber, createdBy: userId});
    if(phoneNumberExists) {
        return next(createCustomError('Contact Already Exist',503));
    }

    toUpdate.phoneNumber = phoneNumber;
    const update = await Contact.updateOne({ _id: id, createdBy: userId },toUpdate,{new: true, runValidators: true});
    res.status(200).json({success: true, update});
});

const deleteContact = asyncWrapper( async (req,res,next) => {

    //gets the mongoDB ObjectID as param
    const { id } = req.params;
    const createdBy = req.user.userId;

    //if the ObjectID given can be deleted
    const isAllowed = await Contact.findOne( {_id: id, createdBy} );

    // if not allowed because the Contact belongs to some other user
    if(!isAllowed){
        return next(createCustomError('Contact Does Not Exist', 406))
    }
    
    const deleteContact = await Contact.deleteOne({createdBy, _id: id}); 
    res.status(200).json({success: true, deleteContact});
});

module.exports = {
    createContact,
    addBulkContacts,
    getAllContacts,
    getContact,
    updateContact,
    deleteContact
};