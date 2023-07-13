const router = require('express').Router();
const contactsCtrl = require('../controllers/contacts');

router.get('/', contactsCtrl.index);
router.get('/search', contactsCtrl.searchUsers);
router.get('/:id/add', contactsCtrl.addToList);

module.exports = router;
