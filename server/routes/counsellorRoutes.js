const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { registerCounsellor, loginCounsellor, getCounsellorData, getAllCounsellors } = require('../controllers/counsellorController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'counsellors',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

// Initialize multer with cloudinary storage
const upload = multer({ storage: storage });

// Register counsellor with photo upload
router.post('/register-counsellor', upload.single('photo'), registerCounsellor);

// Login counsellor
router.post('/login-counsellor', loginCounsellor);

// Get counsellor data
router.get('/counsellor', authenticateToken, getCounsellorData);

// Get all counsellors
router.get('/counsellors', getAllCounsellors);

module.exports = router;
