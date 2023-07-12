const User = require('../models/user');

module.exports = {
    index,
}

// render add page
function index(req, res) {
    res.render('contacts/index', { title: 'Add Contact'})
}