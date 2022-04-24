const { Pool, Client } = require('pg');
const { parse } = require('url');
require('dotenv').config();

 const options = {
  host: process.env.PG_DATABASE_HOST,
  port : process.env.PG_DATABASE_PORT,
  user: process.env.PG_DATABASE_USER,
  password : process.env.PG_DATABASE_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
};

console.log(process.env.POSTGRES_DATABASE_URL)

const pool = new Client(process.env.POSTGRES_DATABASE_URL || options);
pool.connect()


module.exports = pool;
  