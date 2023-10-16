const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: String, // You may want to hash the password
});

module.exports = mongoose.model('User', userSchema);
