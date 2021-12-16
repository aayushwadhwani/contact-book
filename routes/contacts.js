const express = require('express');
const { createContact, updateContact, deleteContact, getAllContacts, addBulkContacts, getContact } = require('../controllers/contacts');
const router = express.Router();

router.route('/').post(createContact).get(getAllContacts);
router.route('/:id').get(getContact).patch(updateContact).delete(deleteContact);
router.route('/bulk').post(addBulkContacts);

module.exports = router;