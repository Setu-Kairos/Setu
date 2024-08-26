const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    openIdUsername: { type: String, unique: true, required: true },
    ethAddress: { type: String,unique: true, required: true },
    name: String,
    gender: String,
    email: String,
    phone: String,
    class: String,
    school: String,
    city: String,
    state: String,
    dob: Date,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
