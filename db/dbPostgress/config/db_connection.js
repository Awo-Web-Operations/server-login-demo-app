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


const pool = new Client("postgresql://postgres:changeme@localhost:5432/awoE");
pool.connect()  


module.exports = pool;
