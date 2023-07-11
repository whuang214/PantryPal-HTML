const mongoose = require('mongoose');

const GroceryItemSchema = new mongoose.Schema({
    groceryList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroceryList' // Reference the GroceryItem model
    },
    category: {
        type: String,
        /* enum: [
            'Fruits and Vegetables', 
            'Dairy and Eggs', 
            'Meat and Poultry', 
            'Seafood', 
            'Bread and Bakery', 
            'Cereal and Breakfast Foods', 
            'Pasta and Rice', 
            'Canned Goods', 
            'Frozen Foods', 
            'Snacks and Chips', 
            'Beverages', 
            'Condiments and Sauces', 
            'Baking Supplies', 
            'Spices and Seasonings', 
            'Oils and Vinegars', 
            'Sweets and Desserts', 
            'Baby and Infant', 
            'Personal Care', 
            'Household Supplies', 
            'Pet Food and Supplies',
            'Other'
        ],
        */
        required: false
    },
    price: { type: Number, required: false },
}, { timestamps: true });

module.exports = mongoose.model('GroceryItem', GroceryItemSchema);
