const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config');

const connection = mysql.createConnection(mysqlConfig);
const query = util.promisify(connection.query).bind(connection);

const saveEvent = (req) => {
    query(`INSERT INTO event (name, time, category, location, summary) VALUES (${req.name}, ${req.date}, ${req.category}, ${req.address}, ${req.summary})`)
    .then(() => console.log(added))
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    saveEvent
}