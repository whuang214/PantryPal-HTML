const router = require('express').Router();
const contactsCtrl = require('../controllers/contacts');

// GET /contacts
router.get('/', contactsCtrl.index);

// GET Search Results
router.get('/search', contactsCtrl.searchUsers);

// GET share contact page
router.get('/:id/add', contactsCtrl.addToList);

// POST share list with user
router.post('/:id/add', contactsCtrl.shareList);

module.exports = router;
