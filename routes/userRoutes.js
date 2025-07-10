import express from 'express';
import { getAllUsers, getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.get('/', protect, getAllUsers);         // Get all users
router.get('/profile', protect, getProfile);   // Get current user profile
router.put('/profile', protect, updateProfile); // Update current user

export default router;