const router = require('express').Router();
const listsCtrl = require('../controllers/lists');

// render all lists
router.get('/', listsCtrl.allUserList);

// GET /lists/new
router.get('/new', listsCtrl.new);

// POST /lists
router.post('/create', listsCtrl.create);

// GET /lists/:id
router.get('/:id', listsCtrl.show);

// POST /lists/:id/items
router.post('/:id/items', listsCtrl.addItem);

// // DELETE /lists/:id
router.delete('/:id', listsCtrl.deleteList);

// DELETE /lists/:id/items/:itemId
router.delete('/:id/item/:itemId', listsCtrl.deleteItem);

// GET /lists/:id/edit
router.get('/:id/edit', listsCtrl.editPage);

// PUT /lists/:id
router.put('/:id/edit', listsCtrl.update);

module.exports = router;

