import express from 'express'
const router = express.Router();
import { createDoc, getDocs, updateDoc, getDocVersions, getDocById } from '../controllers/documentController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createDoc).get(protect, getDocs);
router.route('/:id').get(protect, getDocById).put(protect, updateDoc);
router.get('/:id/versions', protect, getDocVersions);

export default router