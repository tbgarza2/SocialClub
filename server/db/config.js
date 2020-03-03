// const { DB_HOST, DB_USER, DB_PASS, DB_PATH } = require('./process.js');

module.exports = {
    host: process.env.DB_HOST || '216.58.194.148',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'team4ahalfstar',
    database: 'socialclub',
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || '/cloudsql/team4ahalfstar:us-central1:team4ahalfstar'
};