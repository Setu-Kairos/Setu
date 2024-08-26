const jwt = require('jsonwebtoken');
const Student = require('../models/studnet');

// Authenticate endpoint controller
exports.authenticateUser = async (req, res) => {
    const { openIdUsername, ethAddress } = req.body;

    const student = await Student.findOne({ openIdUsername });

    if (student) {
        const token = jwt.sign({ openIdUsername, ethAddress }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: 'exists', data: student, token });
    } else {
        res.json({ status: 'new' });
    }
};
