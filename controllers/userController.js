const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password,
        });

        const user = await newUser.save();
        res.status(201).json({ status: true, user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Signup failed', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ status: false, message: 'Invalid username and password' });
        }

        res.status(200).json({
            status: true,
            username: user.username,
            message: 'User logged in successfully',
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Login failed', error: error.message });
    }
};
