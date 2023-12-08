import mysql from 'mysql2/promise'

// create the connection to database

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csdlbanmaychoigame',
    port: 3306
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0
});

// const pool = mysql.createPool({
//     host: 'localhost',
//     port: 3307,
//     user: 'root',
//     password: '0000',
//     database: 'ShopPC_data'
// });

export default pool;