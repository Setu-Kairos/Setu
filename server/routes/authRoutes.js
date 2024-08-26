const express = require('express');
const { authenticateUser } = require('../controllers/authController');

const router = express.Router();

router.post('/authenticate', authenticateUser);

module.exports = router;
