const mongoose = require('mongoose');

const GroceryListSchema = new mongoose.Schema({
    title: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true
    },
    sharedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        default: []
    }],
    itemsList: {
        type: [{
            _id: false,
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'GroceryItem' // Reference the GroceryItem model
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('GroceryList', GroceryListSchema);
