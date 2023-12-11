/* eslint-disable import/extensions */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createDatabase } from './database/databaseConfig.js';
import sendMessage from './routes/sendMessage.js';
import getMessages from './routes/getMessages.js';

// NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './env/.env.production' });
}
dotenv.config({ path: './env/.env.development' });

// Initialize app
const app = express();
const { PORT } = process.env;

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Helmet configuration
app.use(helmet());

// Cors configuration
app.use(cors({
  origin: process.env.CLIENT_URL_CORS,
  credentials: true,
}));

// Database configuration
app.use(createDatabase);

// Routes
app.use('/sendMessage', sendMessage);
app.use('/getMessages', getMessages);

// Listen to server
app.listen(PORT, (err) => {
  if (err) return console.log('-- Server error --');
  return console.log(`
    -- Server running at: ${PORT} --
    -- Node environment: ${process.env.NODE_ENV} --
  `);
});
