const List = require('../models/GroceryList');

module.exports = {
    allUserList,
    new: newlist,
    create,
    show,
    addItem,
    deleteList,
};

async function allUserList(req, res) {
    const user = req.user;

    if (user) {
        const allUserGroceryLists = await List.find({ owner: user._id }).populate('owner').exec();
        // console.log('allUserGroceryLists->', allUserGroceryLists);
        res.render('lists/index', { title: 'My Lists', lists: allUserGroceryLists });  
    } else {
        console.log('not logged in');
        res.redirect('/');
    }
}

// new list page
function newlist(req, res) {
    res.render('lists/new', { title: 'Create List' });
}

// create list
async function create(req, res) {
    const list = new List(req.body);
    list.owner = req.user._id;
    console.log('list->', list);
    try {
        await list.save();
        res.redirect('/lists');
    } catch (err) {
        console.log(err);
        res.render('lists/new', { title });
    }
}

//show list
async function show(req, res) {
    try {
        const list = await List.findById(req.params.id).populate('owner').populate('itemsList').populate('sharedList').exec();
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
        res.redirect('/lists');
    } catch (err) {
        console.log(err);
        res.redirect('/lists');
    }
}

