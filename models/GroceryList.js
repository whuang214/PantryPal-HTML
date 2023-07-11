const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    isShared: Boolean,
    sharedList: [mongoose.Schema.Types.ObjectId],
    itemsList: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);
