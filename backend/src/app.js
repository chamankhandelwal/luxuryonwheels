import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        process.env.CLIENT_URL
      ].filter(Boolean);

      const isAllowed =
        !origin ||
        allowedOrigins.includes(origin) ||
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

      callback(isAllowed ? null : new Error(`CORS blocked for origin: ${origin}`), isAllowed);
    },
    credentials: true
  })
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 600 }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => res.json({ success: true, service: 'Luxury on Wheels API' }));
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
