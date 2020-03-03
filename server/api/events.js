const { Router } = require('express');
const eventRouter = Router();
const {
  saveEvent,
  getCreatedEvents,
  getAllEvents,
  getEventPage,
} = require('../db/index.js')

eventRouter.post('/events', (req, res) => {
  saveEvent(req.body)
})

eventRouter.get(`/events/:id`, (req, res) => {
  getCreatedEvents(req.params.id)
    .then(data => {
      console.log(data)
      res.send(data)
    })
})

eventRouter.get('/events', (req, res) => {
  getAllEvents()
    .then((events) => {
      res.send(events);
    })
});

eventRouter.get('/events/page/:id', (req, res) => {
  getEventPage(req.params.id)
    .then(data =>
      res.send(data))
});

module.exports = {
  eventRouter
}