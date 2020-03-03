const { Router } = require('express');

const rsvpRouter = Router();
const { rsvp, rsvpUsers } = require('../db/index.js');

rsvpRouter.post('/rsvp/:event_id/:user_id', (req, res) => {
  console.log(req);
  // debugger;
  const { event_id, user_id } = req.params;
  rsvp(event_id, user_id)
    .then(() => {
      res.send(res);
    })
    .catch(() => {
      res.send("No RSVP'D users");
    });
});

rsvpRouter.get('/rsvp/conf/:event_id', (req, res) => {
  console.log(req);
  // debugger;
  rsvpUsers(req.params.event_id)
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = {
  rsvpRouter,
};
