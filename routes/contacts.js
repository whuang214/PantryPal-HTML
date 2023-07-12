const router = require('express').Router();
const contactsCtrl = require('../controllers/contacts');

router.get('/', contactsCtrl.index);

module.exports = router;
