// Import necessary modules
import User from '../models/User.js';

// @desc    Get all users (excluding password)
// @route   GET /api/users
// @access  Private (Admin or authenticated users if needed)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// @desc    Update current user's profile (name/email)
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};
