import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '<password>',
  database: 'CRUD_With_MYSQL',
  waitForConnections: true,
  connectionLimit:10,
  queueLimit:0
});
