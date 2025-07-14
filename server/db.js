const Pool = require("pg").Pool;

const pool = new Pool ({
  user: "heapadmin",
  password: "heapadmin123",
  host: "localhost",
  port: 5432, 
  database: "heapsocial"
})

module.exports = pool; 
