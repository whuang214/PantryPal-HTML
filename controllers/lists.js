const List = require("../models/GroceryList");

module.exports = {
  allUserList,
  new: newlist,
  create,
  show,
  addItem,
  deleteList,
  deleteItem,
  editPage,
  update,
  deleteSharedUser,
};

// render index page
async function allUserList(req, res) {
  const user = req.user;

  if (user) {
    try {
      const ownedLists = await List.find({ owner: user._id })
        .populate("owner")
        .exec();

      const sharedLists = await List.find({ sharedList: { $in: [user._id] } })
        .populate("owner")
        .exec();
      // console.log("sharedLists->", sharedLists);
      const allLists = ownedLists.concat(sharedLists);
      // console.log("allLists->", allLists);

      res.render("lists/index", { title: "My Lists", lists: allLists });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  } else {
    console.log("not logged in");
    res.redirect("/");
  }
}

// new list page
function newlist(req, res) {
  res.render("lists/new", { title: "Create List" });
}

// create list
async function create(req, res) {
  const list = new List(req.body);
  list.owner = req.user._id;
  console.log("list->", list);
  try {
    await list.save();
    res.redirect("/lists");
  } catch (err) {
    console.log(err);
    res.render("lists/new", { title });
  }
}

//show list
async function show(req, res) {
  try {
    const list = await List.findById(req.params.id)
      .populate({
        path: 'itemsList.item',
        model: 'GroceryItem'
      })
      .populate('owner')
      .populate('sharedList')
      .exec();

    // console.log('list->', list);
    res.render('lists/show', { title: 'List Details', list });
  } catch (err) {
    console.log(err);
    res.redirect('/lists');
  }
}

// add item to list
async function addItem(req, res) {
  try {
    const list = await List.findById(req.params.id);
    list.items.push(req.body);
    await list.save();
    res.redirect(`/lists/${list._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/lists/${list._id}`);
  }
}

// delete list
async function deleteList(req, res) {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.redirect("/lists");
  } catch (err) {
    console.log(err);
    res.redirect("/lists");
  }
}

// delete item from list
async function deleteItem(req, res) {
  try {
    const list = await List.findById(req.params.id);
    const idx = list.itemsList.findIndex(
      (item) => item.id === req.params.itemId
    );
    list.itemsList.splice(idx, 1);
    await list.save();
    res.redirect(`/lists/${list._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/lists/${list._id}`);
  }
}

// delete shared user from list
async function deleteSharedUser(req, res) {
  try {
    const list = await List.findById(req.params.id); // get list from db
    const idx = list.sharedList.findIndex( // find index of user in sharedList array
      (item) => item.id === req.params.userId
    );
    console.log("idx->", idx);
    list.sharedList.splice(idx, 1);
    await list.save();
    res.redirect(`/lists/${list._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/lists/${list._id}`);
  }
}

// render edit page
async function editPage(req, res) {
  try {
    const list = await List.findById(req.params.id)
      .populate("owner")
      .populate("sharedList")
      .exec();

    res.render("lists/edit", { title: "Edit List", list });
  } catch (err) {
    console.error(err);
    res.redirect("/lists");
  }
}

// update list
async function update(req, res) {
  try {
    const listId = req.params.id;
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        title: req.body.title,
        // Add other fields to update
      },
      { new: true }
    );
    if (!updatedList) {
      throw new Error("List not found");
    }
    res.redirect(`/lists/${updatedList._id}/edit`);
  } catch (err) {
    console.error(err);
    res.redirect("/lists");
  }
}
