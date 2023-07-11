const router = require('express').Router();
const passport = require('passport');
const itemsCtrl = require('../controllers/items');

// get the item database
router.get('/', itemsCtrl.index);

module.exports = router;