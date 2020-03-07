const { Router } = require('express');

const rsvpRouter = Router();
const { rsvp, userAttends, rsvpUsers } = require('../db/index.js');

// rsvp a specific user to a specific event
rsvpRouter.post('/rsvp/:event_id/:user_id', (req, res) => {
  console.log(req);
  const { event_id, user_id } = req.params;
  rsvp(event_id, user_id)
    .then(() => {
      res.send(`user id of ${user_id} has rsvp'd to ${event_id}`);
    })
    .catch((error) => {
      res.send('could not RSVP user', error);
    });
});

// get a list of events a users has rsvp'd to
rsvpRouter.get('/rsvp/:user_id', (req, res) => {
  userAttends(req.params.user_id)
    .then(rsvpEvents => {
      console.log(rsvpEvents);
      res.send(rsvpEvents);
    })
    .catch(() => {
      res.send();
    });
});

// get all users rsvp's to a specific event
rsvpRouter.get('/rsvp/conf/:event_id/:user_id', (req, res) => {
  // console.log(req.params);
  const { event_id, user_id } = req.params;
  rsvpUsers(event_id, user_id)
    .then(users => {
      console.log(users);
      res.send(users);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = {
  rsvpRouter,
};
