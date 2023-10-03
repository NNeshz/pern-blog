// Dependencies:
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { pool } from './db.js'
import { ORIGIN } from './config.js';

// Routes:
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';

const app = express();

app.use(cors({
  origin: ORIGIN,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRoutes);
app.use('/api', blogRoutes);


// Test routes:
app.get('/', (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.get('/api/ping', async (req, res) => {
    const response = await pool.query('SELECT NOW()');
    res.json(response.rows[0]);
});


// Error handling:
app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

export default app;