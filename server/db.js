const Pool = require("pg").Pool;

const pool = new Pool ({
  user: "zacha",
  password: "Dread666!",
  host: "localhost",
  port: 5432, 
  database: "heapsocial"
})

module.exports = pool; 
