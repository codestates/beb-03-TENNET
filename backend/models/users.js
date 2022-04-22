const mongoose = require('mongoose');

const users = new mongoose.Schema(
    {
        nickname: { type: String },
        account: { type: String, required: true, unique: true },
        // profile_image: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', users);