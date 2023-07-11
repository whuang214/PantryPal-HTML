const router = require('express').Router();
const listsCtrl = require('../controllers/lists');

// render all lists
router.get('/', listsCtrl.allUserList);

// // GET /lists/new
// router.get('/new', listsCtrl.new);

// // POST /lists
// router.post('/', listsCtrl.create);

// // GET /lists/:id
// router.get('/:id', listsCtrl.show);

// // POST /lists/:id/items
// router.post('/:id/items', listsCtrl.addItem);

// // DELETE /lists/:id
// router.delete('/:id', listsCtrl.delete);

// // DELETE /lists/:id/items/:itemId
// router.delete('/:id/items/:itemId', listsCtrl.deleteItem);

module.exports = router;

