const { DB_HOST, DB_USER, DB_PASS } = require('./process');

module.exports = {
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    password: DB_PASS || '',
    database: 'socialclub',
};