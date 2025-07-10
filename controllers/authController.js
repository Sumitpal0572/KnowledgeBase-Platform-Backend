import { use } from 'react'
import User from '../models/User.js'

export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const userExits = await User.findOne({ email });
        if (userExits) return res.status(400).json({ message: "User already Exits" });

        // Create new User

        const user = await User.create({ name, email, password });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
};

// login

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};