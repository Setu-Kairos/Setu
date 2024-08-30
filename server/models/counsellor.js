const mongoose = require('mongoose');

const counsellorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String }, // URL or file path for the photo
    bio: { type: String }, // A short biography
});

const Counsellor = mongoose.model('Counsellor', counsellorSchema);
module.exports = Counsellor; 