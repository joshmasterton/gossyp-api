/* eslint-disable import/extensions */
import express from 'express';
import {
  body,
  validationResult,
} from 'express-validator';
import { queryDb } from '../database/databaseConfig.js';

const sendMessage = express.Router();

sendMessage.post(
  '/',
  body('message')
    .notEmpty()
    .withMessage('Empty message'),
  async (req, res) => {
    const validator = validationResult(req);
    if (validator.array()[0]) {
      return res.json({
        err: validator.array()[0].msg,
      });
    }
    const insertMessage = await queryDb(`
      INSERT INTO messages(
        message,
        username,
        userImg,
        created_on
      ) VALUES(
        '${req.body.message}',
        '${req.body.user}',
        '${req.body.userImg}',
        '${new Date(Date.now()).toISOString()}'
      ) RETURNING *;
    `);
    console.log(insertMessage);
    return res.json(req.body);
  },
);

export default sendMessage;
