const express = require('express');
const router = express.Router();
const { createDoc, getDocs, updateDoc } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createDoc).get(protect, getDocs);
router.route('/:id').put(protect, updateDoc);

module.exports = router;