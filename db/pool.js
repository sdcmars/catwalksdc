const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "dogs",
  host: "3.129.24.114",
  port: 5432,
  database: "product"
})

module.exports = pool;