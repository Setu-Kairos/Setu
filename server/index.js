const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const counsellorRoutes = require('./routes/counsellorRoutes');

app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', counsellorRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => { 
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
