const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
        type: String,
        required: true,
    },
    email: String,
    avatar: String,
    // lists: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'List'
    // }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);