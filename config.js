const { Pool } = require("pg");
const isNotDev = !(process.env.NODE_ENV === "dev");
const PORT = process.env.PORT || 4000;
const local_DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectionString = process.env.DATABASE_URL || local_DATABASE_URL;
//console.log(`${process.env.DB_USER} isNotDev: ${isNotDev}`);
const pool = new Pool({
    connectionString: connectionString,
    ssl: isNotDev,
});
module.exports = { pool, PORT };