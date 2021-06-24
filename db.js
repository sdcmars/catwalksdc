const Pool = require("pg").Pool;

const pool = new Pool({
  user: "samimhoff",
  password: "dogs",
  host: "localhost",
  port: 5432,
  database: "product"
})

module.exports = pool;