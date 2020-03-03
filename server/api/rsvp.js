const { Router } = require('express');
const rsvpRouter = Router();
const {
  rsvp,
} = require('../db/index.js')

rsvpRouter.post('/rsvp', (req, res) => {
  rsvp(req.body)
    .then(() => {
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
});

module.exports = {
  rsvpRouter
}