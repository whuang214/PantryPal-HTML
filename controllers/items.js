const Item = require('../models/GroceryItem');

module.exports = {
    index,
    new: newItems,
    create
};

// going to the items page
async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index', { title: 'Item Database', items});
}

function newItems(req, res) {
    res.render('items/new', { title: 'Add Item' });
}

async function create(req, res) {
    const item = new Item(req.body);
    console.log("added item->", item);
    try {
        await item.save();
        res.redirect('/items');
    }
    catch (err) {
        console.log(err);
        res.redirect('/items/new');
    }
}
