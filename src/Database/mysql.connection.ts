import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'advik@1626',
  database: 'CRUD_With_MYSQL',
  waitForConnections: true,
  connectionLimit:10,
  queueLimit:0
});

// async function db_Connection() {
//   return await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'advik@1626',
//     database: 'CRUD_With_MYSQL',
//   });
// }
// console.log(db_Connection);

// export { db_Connection };
