const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
    title: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference the User model
    },
    isShared: Boolean,
    sharedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference the User model
    }],
    itemsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroceryItem' // Reference the GroceryItem model
    }]
}, { timestamps: true });

module.exports = mongoose.model('GroceryList', GroceryListSchema);
