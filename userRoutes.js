const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "Signup success" });
});

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne(req.body);
    if(user) res.json({ message: "Login success", user });
    else res.json({ message: "Invalid" });
});

module.exports = router;