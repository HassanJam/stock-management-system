// /backend/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, department } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    User.create({ username, password: hashedPassword, department }, (err, result) => {
        if (err) return res.status(500).json({ message: 'User registration failed.' });
        res.status(201).json({ message: 'User registered successfully.' });
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials.' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, department: user.department }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, department: user.department });
    });
};

module.exports = { register, login };
