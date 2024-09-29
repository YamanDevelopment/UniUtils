const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	googleId: String,
	data: [[Number]], // Array of arrays containing 5-digit integers
});

module.exports = mongoose.model('User', userSchema);