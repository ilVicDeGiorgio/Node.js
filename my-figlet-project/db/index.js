const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: "myappuser",
  host: "localhost",
  database: "myappdb",
  password: "mypassword",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
