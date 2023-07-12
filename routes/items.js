const router = require('express').Router();
const passport = require('passport');
const itemsCtrl = require('../controllers/items');

// get the item database
router.get('/', itemsCtrl.index);

// add item page route
router.get('/new', itemsCtrl.new);

// add item to database
router.post('/create', itemsCtrl.create);

// show item page route
router.get('/:id/options', itemsCtrl.show);

module.exports = router;