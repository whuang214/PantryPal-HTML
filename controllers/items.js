const Item = require("../models/GroceryItem");
const List = require("../models/GroceryList");

module.exports = {
  index,
  new: newItems,
  create,

  addItemPage,
  addItem,
  editItem,
  updateItem,

  deleteItem,
};

// going to the items page
async function index(req, res) {
  const items = await Item.find({});
  res.render("items/index", { title: "Item Database", items });
}

function newItems(req, res) {
  res.render("items/new", { title: "Add Item" });
}

// create item post
async function create(req, res) {
  const item = new Item(req.body);
  // console.log("added item->", item);
  try {
    await item.save();
    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items/new");
  }
}

// show add item page
async function addItemPage(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    const lists = await List.find({ owner: req.user._id });
    res.render("items/add", { title: "Add to List", item, lists });
  } catch (err) {
    console.log(err);
    res.redirect("/items");
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
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// edit item page
async function editItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    res.render("items/edit", { title: "Edit Item", item });
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// edit item put
async function updateItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    item.name = req.body.name;
    item.category = req.body.category;
    item.price = req.body.price;
    await item.save();
    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}

// DELETE item
async function deleteItem(req, res) {
  try {
    // delete item from the item database
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    // go through all the list and delete the item from the list
    const lists = await List.find({ itemsList: deletedItem._id });
    await Promise.all(
      lists.map(async (list) => {
        const index = list.itemsList.indexOf(deletedItem._id);
        // if the item is in the list, delete it
        if (index !== -1) {
          list.itemsList.splice(index, 1);
          await list.save();
        }
        // else do nothing
      })
    );

    res.redirect("/items");
  } catch (err) {
    console.log(err);
    res.redirect("/items");
  }
}
