const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hashedPassword });
		await user.save();
		const token = jwt.sign({ userId: user._id }, 'YOUR_JWT_SECRET');
		res.status(201).json({ user: { email: user.email }, token });
	} catch (error) {
		res.status(400).json({ message: 'Error creating user' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Authentication failed' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Authentication failed' });
		}
		const token = jwt.sign({ userId: user._id }, 'YOUR_JWT_SECRET');
		res.json({ user: { email: user.email }, token });
	} catch (error) {
		res.status(400).json({ message: 'Error logging in' });
	}
});

router.post('/google', async (req, res) => {
	try {
		const { token } = req.body;
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: 'YOUR_GOOGLE_CLIENT_ID',
		});
		const { email, sub: googleId } = ticket.getPayload();
		let user = await User.findOne({ email });
		if (!user) {
			user = new User({ email, googleId, password: 'google-oauth' });
			await user.save();
		}
		const jwtToken = jwt.sign({ userId: user._id }, 'YOUR_JWT_SECRET');
		res.json({ user: { email: user.email }, token: jwtToken });
	} catch (error) {
		res.status(400).json({ message: 'Error authenticating with Google' });
	}
});

// Add user data route
router.post('/user-data', async (req, res) => {
	try {
		const { userId } = req.user; // Assuming you have middleware to verify JWT and add user to req
		const { data } = req.body;
		const user = await User.findById(userId);
		user.data = data;
		await user.save();
		res.json({ message: 'User data updated successfully' });
	} catch (error) {
		res.status(400).json({ message: 'Error updating user data' });
	}
});

module.exports = router;