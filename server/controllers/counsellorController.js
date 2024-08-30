const Counsellor = require('../models/counsellor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerCounsellor = async (req, res) => {
    const { name, age, email, password, bio, type } = req.body;


    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: 'Photo upload failed. Please try again.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new counsellor
        const newCounsellor = new Counsellor({
            name,
            age,
            email,
            password: hashedPassword,
            bio,
            photo: req.file.path, 
            type
        });

        // Save the counsellor to the database
        await newCounsellor.save();

        // Generate JWT token
        const token = jwt.sign({ email: newCounsellor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token along with the success message and counsellor data
        res.status(201).json({
            message: 'Counsellor registered successfully',
            token,
            counsellor: {
                name: newCounsellor.name,
                age: newCounsellor.age,
                email: newCounsellor.email,
                bio: newCounsellor.bio,
                photo: newCounsellor.photo,
                type: newCounsellor.type
            },
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error registering counsellor',
            error: err.message,
        });
    }
};


exports.loginCounsellor = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)

    try {
        const counsellor = await Counsellor.findOne({ email });
        if (!counsellor) {
            return res.status(400).json({ message: 'Counsellor not found' });
        }

        const isMatch = await bcrypt.compare(password, counsellor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: counsellor.email }, process.env.JWT_SECRET);

        // Return the token along with the counsellor data
        res.json({
            token,
            counsellor: {
                name: counsellor.name,
                age: counsellor.age,
                email: counsellor.email,
                bio: counsellor.bio,
                photo: counsellor.photo,
                type: counsellor.type,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


exports.getCounsellorData = async (req, res) => {
    try {
        const counsellor = await Counsellor.findOne({ email: req.email });
        if (!counsellor) {
            return res.status(404).json({ message: 'Counsellor not found' });
        }
        res.json(counsellor);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching counsellor data', error: err.message });
    }
}

exports.getAllCounsellors = async (req, res) => {
    try {
        // Fetch all counsellors from the database
        const counsellors = await Counsellor.find();

        // Return the list of counsellors
        res.status(200).json(counsellors);
    } catch (err) {
        // Handle errors and return a server error response
        res.status(500).json({ message: 'Error fetching counsellors', error: err.message });
    }
};
