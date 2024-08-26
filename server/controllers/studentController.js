const jwt = require('jsonwebtoken');
const Student = require('../models/studnet');

// Student form submission controller
exports.submitStudentForm = async (req, res) => {
    try {
        const studentData = req.body;
        const student = new Student(studentData);
        await student.save();

        const token = jwt.sign({ openIdUsername: student.openIdUsername, ethAddress: student.ethAddress }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: 'success', token });
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ status: 'error', message: 'Failed to save student data' });
    }
};

// Get student data controller
exports.getStudentData = async (req, res) => {
    try {
        const student = await Student.findOne({ openIdUsername: req.params.openIdUsername });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ status: 'success', data: student });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch student data' });
    }
};
