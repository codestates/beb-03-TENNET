const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nickname: { type: String },
        account: { type: String, required: true, unique: true },
        // profile_image: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);