const router = require('express').Router();
const passport = require('passport');
const itemsCtrl = require('../controllers/items');

// GET the item database
router.get('/', itemsCtrl.index);

// GET add item page route
router.get('/new', itemsCtrl.new);

// POST add item to database
router.post('/create', itemsCtrl.create);

// GET show item page
router.get('/:id/options', itemsCtrl.show);

// GET add item page
router.get('/:id/add', itemsCtrl.addItemPage);

// POST add item to list
router.post('/:id/add', itemsCtrl.addItem);


module.exports = router;