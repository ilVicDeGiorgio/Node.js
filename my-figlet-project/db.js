// db.js
const pgp = require("pg-promise")();
const db = pgp("postgres://myuse:mypassword@localhost:5432/planetsdb");

module.exports = db;
