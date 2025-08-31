// import mysql from "mysql2/promise";

// let pool;

// if (!global._pool) {
//   global._pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });
// }

// pool = global._pool;

// export { pool };
import mysql from "mysql2/promise";

let pool;

if (!global._pool) {
  const config = {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    idleTimeout: 300000,
  };

  console.log('Database config:', {
    host: config.host,
    user: config.user,
    database: config.database,
    port: config.port,
    ssl: !!config.ssl
  });

  global._pool = mysql.createPool(config);
}

pool = global._pool;

export { pool };