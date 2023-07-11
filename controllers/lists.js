const List = require('../models/GroceryList');

module.exports = {
    allUserList,
};

async function allUserList(req, res) {
    const user = req.user;

    if (user) {
        const allUserGrocceryLists = await List.find({ owner: user._id });
        res.render('lists/index', { title: 'All Lists', lists: allUserGrocceryLists });  
    } else {
        // not logged in
        res.redirect('/');
    }
}

// new list page
function newlist(req, res) {
    res.render('lists/new', { title: 'Add List' });
}

