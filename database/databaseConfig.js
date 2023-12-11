import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;

// NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './env/.env.production' });
}
dotenv.config({ path: './env/.env.development' });

export const queryDb = async (queryString) => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    const res = await client.query(queryString);
    await client.end();
    return res.rows;
  } catch (err) {
    return console.log(err);
  }
};

export const createDatabase = async (req, res, next) => {
  try {
    await queryDb(`
    CREATE TABLE IF NOT EXISTS messages(
      id SERIAL,
      message VARCHAR(255),
      username VARCHAR(100),
      userImg VARCHAR(255),
      created_on TIMESTAMPTZ
    );
  `);
    next();
  } catch (err) {
    next(err);
  }
};
