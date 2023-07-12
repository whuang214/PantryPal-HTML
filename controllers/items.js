const Item = require('../models/GroceryItem');
const List = require('../models/GroceryList');

module.exports = {
    index,
    new: newItems,
    create,
    show,
    addItemPage,
    addItem,
};

// going to the items page
async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index', { title: 'Item Database', items});
}

function newItems(req, res) {
    res.render('items/new', { title: 'Add Item' });
}

// create item
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

// show item
async function show(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        res.render('items/show', { title: 'Item Details', item });
    }
    catch (err) {
        console.log(err);
        res.redirect('/items');
    }
}

// show add item page
async function addItemPage(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        const lists = await List.find({ owner: req.user._id });
        res.render('items/add', { title: 'Add to List', item, lists });
    }
    catch (err) {
        console.log(err);
        res.redirect('/items');
    }
}

// add item to list
async function addItem(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        const list = await List.findById(req.body.list);
        // console.log("item->", item);
        // console.log("list->", list);
        list.itemsList.push(item);
        await list.save();
        res.redirect(`/lists/${list._id}`);
    }
    catch (err) {
        console.log(err);
        res.redirect('/items');
    }
}
