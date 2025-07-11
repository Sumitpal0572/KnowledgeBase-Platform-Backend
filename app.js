// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

// ✅ CORS setup with fallback if env is missing
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

// ✅ Optional health check route
app.get('/', (req, res) => {
    res.send('KnowledgeBase API is running');
});

// ✅ Custom error handler (always last)
app.use(errorHandler);

export default app;
