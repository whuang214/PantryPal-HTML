const router = require('express').Router();
const listsCtrl = require('../controllers/lists');

// render all lists
router.get('/', listsCtrl.allUserList);

// GET /lists/new page
router.get('/new', listsCtrl.new);

// POST a new list
router.post('/create', listsCtrl.create);

// GET specific list id
router.get('/:id', listsCtrl.show);

// POST item to a list
router.post('/:id/items', listsCtrl.addItem);

// DELETE list from user
router.delete('/:id', listsCtrl.deleteList);

// DELETE item from list
router.delete('/:id/item/:itemId', listsCtrl.deleteItem);

// DELETE shared user from list
router.delete('/:id/shared/:userId', listsCtrl.deleteSharedUser);

// GET /lists/:id/edit
router.get('/:id/edit', listsCtrl.editPage);

// PUT the edited list
router.put('/:id/edit', listsCtrl.update);

module.exports = router;

