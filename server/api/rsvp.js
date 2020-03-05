const { Router } = require('express');

const rsvpRouter = Router();
const { rsvp, rsvpUsers } = require('../db/index.js');

rsvpRouter.post('/rsvp/:event_id/:user_id', (req, res) => {
  console.log(req);
  const { event_id, user_id } = req.params;
  rsvp(event_id, user_id)
    .then(() => {
      res.send(`user id of ${user_id} has rsvp'd to ${event_id}`);
    })
    .catch(() => {
      // debugger;
      res.send('could not RSVP user');
    });
});

rsvpRouter.get('/rsvp/conf/:event_id', (req, res) => {
  console.log(req.params);
  rsvpUsers(req.params.event_id)
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
