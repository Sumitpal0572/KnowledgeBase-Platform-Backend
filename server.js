import app from './app.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
    })
    .catch(err => console.error('Mongo DB connection err :', err))