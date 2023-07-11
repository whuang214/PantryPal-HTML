const Item = require('../models/GroceryItem');

module.exports = {
    index,
};

// going to the items page
async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index', { title: 'Item Database',items });
}