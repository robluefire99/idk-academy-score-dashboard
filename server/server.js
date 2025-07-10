const express = require('express');
const passport= require('passport');
const cors    = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
require('./config/passport');

const authRoutes    = require('./routes/authRoutes');
const userRoutes    = require('./routes/userRoutes');
const scoreRoutes   = require('./routes/scoreRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const errorHandler  = require('./middlewares/errorHandler');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth',    authRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/scores',  scoreRoutes);
app.use('/api/subjects',subjectRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
