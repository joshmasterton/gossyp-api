/* eslint-disable import/extensions */
import express from 'express';
import { queryDb } from '../database/databaseConfig.js';

const getMessages = express.Router();

getMessages.get(
  '/',
  async (req, res) => {
    const retreive = await queryDb(`
      SELECT * FROM messages;
    `);
    return res.json(retreive);
  },
);

export default getMessages;
