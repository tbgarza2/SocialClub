// const { DB_HOST, DB_USER, DB_PASS, DB_PATH } = require('./process.js');

module.exports = {
    host: process.env.DB_HOST || 'team4ahalfstar.appspot.com',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: 'socialclub',
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` || ''
};