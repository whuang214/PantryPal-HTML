const List = require('../models/GroceryList');

module.exports = {
    allUserList,
    new: newlist,
    create,
};

async function allUserList(req, res) {
    const user = req.user;

    if (user) {
        const allUserGroceryLists = await List.find({ owner: user._id }).populate('owner').exec();
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

