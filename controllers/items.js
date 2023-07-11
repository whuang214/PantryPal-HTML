const Item = require('../models/GroceryItem');

module.exports = {
    index,
    new: newItems,
};

// going to the items page
async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index', { title: 'Item Database', items});
}

function newItems(req, res) {
    res.render('items/new', { title: 'Add Item' });
}

// function create(req, res) {}