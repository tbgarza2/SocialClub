const mysql = require('mysql');
const util = require('util');
const mysqlConfig = require('./config');

const connection = mysql.createConnection(mysqlConfig);
const query = util.promisify(connection.query).bind(connection);

connection.connect(err => {
    if(err){
        console.error(err);
    } else {
        console.log('Database connected!');
    }
});

const saveEvent = (req, res) => {
  return query(
    `INSERT INTO events VALUES (null, "${req.name}", "${req.date}", null, "${req.category}", "${req.address}", (SELECT id FROM users WHERE name = "${req.creator}"), "${req.summary}", "${req.roomID}")`,
  );
};

const getCreatedEvents = (req, res) => {
  const id = req;
  return query(`SELECT * FROM events WHERE creator_id=${id}`);
};

const addUser = (req, res) => {
  const { username, email } = req;
  query(
    `INSERT IGNORE INTO users (name, email) VALUES ("${username}", "${email}")`,
  );
};

const selectUser = (req, res) => {
  const userEmail = req;
  return query(`SELECT id FROM users WHERE email="${userEmail}"`);
};

const getAllEvents = (req, res) => query('SELECT * FROM events');

const getEventPage = (req, res) => {
  const id = req;
  return query(`SELECT * FROM events WHERE id="+${id}"`);
};

const rsvp = (event_id, user_id) => {
  return query(
    `INSERT INTO rsvp (user_id, event_id) VALUES (${user_id}, ${event_id})`,
  );
};

const userAttends = (user_id) => {
  const sqlQuery = `
  SELECT * FROM 
    (
      SELECT events.id, events.category, events.name, events.time, events.address, events.creator_id, events.summary
      FROM rsvp 
      INNER JOIN events 
      ON events.id = rsvp.event_id 
      WHERE rsvp.user_id = ?
    ) 
  AS rsvp_events;`;
  return query(sqlQuery, [user_id]);
};

const rsvpUsers = (event_id, user_id) => {
  const mysqlquery = `
    SELECT * FROM
      (
        SELECT users.id, users.name, users.email
        FROM rsvp
        INNER JOIN users
        ON users.id = rsvp.user_id
        WHERE rsvp.event_id = ? AND users.id != ?
      )
    AS rsvp_users;
    `;
  return query(mysqlquery, [event_id, user_id]);
};

const sendMessage = (id_sender, id_recipient, message) => {
  const mysqlQuery = 'INSERT INTO message VALUES(null, null, ?, ?, ?);';

  return query(mysqlQuery, [id_sender, id_recipient, message]);
};

const getMessages = (id_sender, id_recipient) => {
  const mysqlQuery = `
    Select * FROM
      (
        SELECT message.id AS id_message, users.id AS id_user, message.created_at, users.name, message.message
        FROM message
        INNER JOIN users
        ON users.id = message.id_sender
        WHERE message.id_recipient = ? AND message.id_sender = ?
        UNION
        SELECT message.id AS id_message, users.id AS id_user, message.created_at, users.name, message.message
        FROM message
        INNER JOIN users
        ON users.id = message.id_sender
        WHERE message.id_sender = ? AND message.id_recipient = ?
      )
    AS all_messages
    ORDER BY -created_at
    LIMIT 15;`;
  return query(mysqlQuery, [id_sender, id_recipient, id_sender, id_recipient]);
};

module.exports = {
  saveEvent,
  getCreatedEvents,
  addUser,
  getAllEvents,
  selectUser,
  getEventPage,
  rsvp,
  userAttends,
  rsvpUsers,
  sendMessage,
  getMessages,
};
