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

const getCreatedEvents = (req, res) => {
    const name = req
    query(`SELECT name, time, category, location, summary, roomID, creator_id, name, id
        FROM events, users
        INNER JOIN events.creator_id ON users.id
        WHERE name="test";`)
    .then( res => console.log(res))
}

const addUser = (req, res) => {
    const username = req
    query(`INSERT IGNORE INTO users (name) VALUES ("${username}")`)
    .then(res => console.log(res))
}
 
module.exports = {
    saveEvent,
    getCreatedEvents,
    addUser,
}