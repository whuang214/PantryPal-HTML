const router = require('express').Router();
const passport = require('passport');
const itemsCtrl = require('../controllers/items'); 

// GET the item database
router.get('/', itemsCtrl.index);

// GET add item page route
router.get('/new', itemsCtrl.new);

// POST add item to database
router.post('/create', itemsCtrl.create);


// Add to list 

// GET add item page
router.get('/:id/add', itemsCtrl.addItemPage);

// POST add item to list
router.post('/:id/add', itemsCtrl.addItem)


// Edit item

// GET edit item page
router.get('/:id/edit', itemsCtrl.editItem);

// PUT edit item
router.put('/:id', itemsCtrl.updateItem);





module.exports = router;