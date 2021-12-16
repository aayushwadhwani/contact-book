const express = require('express');

//view controllers/contacts.js for all callbacks
const { createContact, updateContact, deleteContact, getAllContacts, addBulkContacts, getContact } = require('../controllers/contacts');
const router = express.Router();

/*
@desc Create A contact
@route POST /api/v1/contact
*/

/*
@desc Get all contacts
@route GET /api/v1/contact
*/
router.route('/').post(createContact).get(getAllContacts);

/*
@desc Get single contact
@route GET /api/v1/contact/:id where :id is the phone number of the contact
*/

/*
@desc Update a given contact
@route PATCH /api/v1/contact/:id where :id is the mongoDB ObjectID
*/

/*
@desc Delete A given contact
@route DELETE /api/v1/contact/:id where :id is the mongoDB ObjectID
*/
router.route('/:id').get(getContact).patch(updateContact).delete(deleteContact);
router.route('/bulk').post(addBulkContacts);

module.exports = router;