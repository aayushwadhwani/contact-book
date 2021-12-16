const express = require('express');
const { createContact, updateContact, deleteContact } = require('../controllers/contacts');
const router = express.Router();

router.route('/').post(createContact);
router.route('/:id').patch(updateContact).delete(deleteContact);

module.exports = router;