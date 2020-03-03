const { DB_HOST, DB_USER, DB_PASS, DB_PATH } = require('./process');

module.exports = {
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASS || '',
    database: 'socialclub',
    socketPath: DB_PATH
};