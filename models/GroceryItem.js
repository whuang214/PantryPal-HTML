const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema({
    groceryList: mongoose.Schema.Types.ObjectId,
    isChecked: Boolean,
    quantity: Number,
    category: { type: String, required: false },
    price: { type: Number, required: false },
});

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
