const User = require('../models/user');

module.exports = {
    index,
    searchUsers,
    addToList,
}

// render add page
function index(req, res) {
    res.render('contacts/index', { title: 'Add Contact', users: [], searched: false });
}

// Search users based on query
async function searchUsers(req, res) {
    const query = req.query.query; // Get the search query from the request

    try {
        // Search for users matching the query
        const users = await User.find({ $or: [{ name: query }, { email: query }] });

        res.render('contacts/index', { title: 'Add Contact', users, searched: true });
    } catch (error) {
        console.error(error);
        res.render('contacts/index', { title: 'Add Contact', users: [], searched: true });
    }
}

// render add to list page
async function addToList(req, res) {
    const clickedUser = await User.findById(req.params.id);
    // console.log(clickedUser);
    res.render('contacts/add', { title: 'Add Contact' });
}