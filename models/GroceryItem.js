const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema({
    groceryList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroceryList' // Reference the GroceryItem model
    },
    isChecked: Boolean,
    quantity: Number,
    category: { type: String, required: false },
    price: { type: Number, required: false },
}, { timestamps: true });

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
