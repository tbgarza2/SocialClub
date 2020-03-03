const { Router } = require('express');
const messageRouter = Router();
const {
  getMessages,
} = require('../db/index.js')

messageRouter.get('/messages/:id_sender/:id_recipient', (req, res) => {
  const { id_sender, id_recipient } = req.params;
  getMessages(id_sender, id_recipient)
    .then(messages => {
      res.send(messages)
    });
});

module.exports = {
  messageRouter
}