const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config');

const connection = mysql.createConnection(mysqlConfig);
const query = util.promisify(connection.query).bind(connection);

const saveEvent = (req, res) => {
    query(`INSERT INTO events (name, time, category, location, summary) VALUES ("${req.name}", "${req.date}", "${req.category}", "${req.address}", "${req.summary}")`)
    .then(console.log('Event added'))
    .catch(err => {
        console.log(err)
    })
}

module.exports = {
    saveEvent
}