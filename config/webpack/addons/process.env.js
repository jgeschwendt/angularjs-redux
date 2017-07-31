const dotenv = require('dotenv');
const path = require('path');

const DOT_ENV_FILE = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
console.log(`Using DOT_ENV_FILE: ${DOT_ENV_FILE}`); // eslint-disable-line no-console

module.exports = Object.assign(
  {},
  dotenv.config({ path: path.resolve(process.cwd(), DOT_ENV_FILE)}).parsed,
  {
    NODE_ENV: process.env.NODE_ENV
  }
);
