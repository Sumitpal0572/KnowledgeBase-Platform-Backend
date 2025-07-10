import express from 'express'
import cors from 'cors'
import morgan from "morgan"
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/docs', documentRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);
export default app;