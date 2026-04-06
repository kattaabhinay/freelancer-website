const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String // client or freelancer
});

module.exports = mongoose.model('User', userSchema);