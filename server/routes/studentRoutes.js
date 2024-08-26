const express = require('express');
const { submitStudentForm, getStudentData } = require('../controllers/studentController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/student-form', submitStudentForm);
router.get('/student-data/:openIdUsername', authenticateToken, getStudentData);

module.exports = router;
