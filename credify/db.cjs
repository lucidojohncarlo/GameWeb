const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'credify',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;